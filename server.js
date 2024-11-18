import express from 'express';
import Database from 'better-sqlite3';
import Redis from 'ioredis';
import Web3 from 'web3';
import Sentiment from 'sentiment';
import languageDetect from 'language-detect';
import translate from 'translate';
import { body, validationResult } from 'express-validator';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

// Database setup
const db = new Database('content.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS contents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    language TEXT NOT NULL,
    trust_score REAL NOT NULL,
    blockchain_hash TEXT NOT NULL
  )
`);

// Redis setup (using in-memory fallback since we're in WebContainer)
const redis = new Redis();

// Web3 setup (using local mock in WebContainer)
const web3 = new Web3();

// Initialize sentiment analyzer
const sentiment = new Sentiment();

// Configure translation
translate.engine = 'google';

const validateContent = [
  body('text').isString().notEmpty().trim(),
];

app.post('/analyze_content', validateContent, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;

    // Detect language
    const detectedLang = languageDetect.detect(text);

    // Translate to English if not in English
    let textEn = text;
    if (detectedLang !== 'en') {
      textEn = await translate(text, { to: 'en' });
    }

    // Perform sentiment analysis
    const sentimentResult = sentiment.analyze(textEn);
    const trustScore = (sentimentResult.comparative + 1) / 2; // Normalize to 0-1

    // Generate blockchain hash
    const contentHash = web3.utils.sha3(text);

    // Store in database
    const stmt = db.prepare(`
      INSERT INTO contents (text, language, trust_score, blockchain_hash)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(text, detectedLang, trustScore, contentHash);

    // Cache result in Redis
    await redis.set(contentHash, trustScore.toString());

    return res.json({
      id: result.lastInsertRowid,
      trust_score: trustScore,
      language: detectedLang,
      blockchain_hash: contentHash
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/verify_content/:contentHash', async (req, res) => {
  try {
    const { contentHash } = req.params;

    // Check Redis cache first
    const cachedScore = await redis.get(contentHash);
    if (cachedScore) {
      return res.json({
        trust_score: parseFloat(cachedScore),
        source: 'cache'
      });
    }

    // If not in cache, check database
    const stmt = db.prepare('SELECT trust_score FROM contents WHERE blockchain_hash = ?');
    const content = stmt.get(contentHash);

    if (content) {
      return res.json({
        trust_score: content.trust_score,
        source: 'database'
      });
    }

    return res.status(404).json({ error: 'Content not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});