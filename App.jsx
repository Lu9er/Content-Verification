import React, { useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3();

// Mock API functions
const mockAnalyze = (text) => {
  const hash = web3.utils.sha3(text);
  const mockScore = Math.random();
  const mockLanguage = text.length % 2 === 0 ? 'en' : 'es';
  
  return {
    trust_score: mockScore,
    language: mockLanguage,
    blockchain_hash: hash
  };
};

const mockVerify = (hash) => {
  return {
    trust_score: 0.75,
    source: Math.random() > 0.5 ? 'cache' : 'database'
  };
};

export default function App() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState(null);
  const [verificationHash, setVerificationHash] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const analyzeContent = () => {
    const response = mockAnalyze(content);
    setResult(response);
  };

  const verifyContent = () => {
    const response = mockVerify(verificationHash);
    setVerificationResult(response);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Content Verification Tool
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Analyze Content</h2>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content to analyze"
            rows={4}
          />
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={analyzeContent}
          >
            Analyze
          </button>
          {result && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-semibold text-gray-700 mb-2">Results:</h3>
              <p className="mb-2">Trust Score: {result.trust_score.toFixed(2)}</p>
              <p className="mb-2">Language: {result.language}</p>
              <p className="break-all">Hash: {result.blockchain_hash}</p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Verify Content</h2>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={verificationHash}
            onChange={(e) => setVerificationHash(e.target.value)}
            placeholder="Enter content hash to verify"
          />
          <button
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            onClick={verifyContent}
          >
            Verify
          </button>
          {verificationResult && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-semibold text-gray-700 mb-2">Verification Results:</h3>
              <p className="mb-2">Trust Score: {verificationResult.trust_score.toFixed(2)}</p>
              <p>Source: {verificationResult.source}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}