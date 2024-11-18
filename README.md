# Content Verification Tool

A modern web application that analyzes and verifies content using blockchain hashing, sentiment analysis, and language detection. Built with React, Express, and Web3 technologies.

## Features

- Content Analysis
  - Text sentiment analysis
  - Language detection
  - Blockchain-based content hashing
  - Trust score calculation
- Content Verification
  - Hash-based verification
  - Cached results via Redis
  - Permanent storage in SQLite database

## Tech Stack

- **Frontend**
  - React
  - Tailwind CSS
  - Web3.js
  - Vite

- **Backend**
  - Express.js
  - Better-SQLite3
  - Redis
  - Sentiment Analysis
  - Language Detection

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Start the backend server:
```bash
node server.js
```

## Usage

### Analyzing Content

1. Enter your text in the "Analyze Content" section
2. Click "Analyze"
3. View the results:
   - Trust Score (0-1)
   - Detected Language
   - Blockchain Hash

### Verifying Content

1. Enter a content hash in the "Verify Content" section
2. Click "Verify"
3. View the verification results:
   - Trust Score
   - Source (cache/database)

## Development

- Frontend runs on port 5173 (Vite default)
- Backend API runs on port 3000
- Redis cache is used for quick retrievals
- SQLite database for permanent storage

## Building for Production

```bash
npm run build
```

This will create a `dist` directory with the production build.

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
