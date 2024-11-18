# Content Verification Tool

## Overview

The Content Verification Tool is a prototype application designed to analyze and verify text content. It uses AI-powered sentiment analysis, blockchain technology for content hashing, and supports multiple languages. This tool aims to provide trust scores for submitted content and allows users to verify previously analyzed content.

## Features

- Content submission and analysis
- AI-powered pattern detection and trust score generation
- Blockchain integration for content hashing
- Multi-language support (English + Yoruba)
- Content verification through web interface and WhatsApp bot
- Caching system for faster verification

## Technical Stack

- Backend: Python FastAPI
- Database: PostgreSQL
- Caching: Redis
- Blockchain: Ethereum (Goerli testnet)
- AI: Hugging Face Transformers
- Frontend: React
- WhatsApp Integration: Twilio API

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/content-verification-tool.git
   cd content-verification-tool
   ```

2. Set up a virtual environment and install dependencies:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\\Scripts\\activate`
   pip install -r requirements.txt
   ```

3. Set up PostgreSQL and create a database for the project.

4. Set up a Redis instance.

5. Create an Infura account and project for Ethereum integration.

6. Update the configuration in `main.py`:
   - Update the PostgreSQL connection string
   - Update the Redis connection details
   - Update the Infura project URL

7. Set up a Twilio account for WhatsApp integration and update the credentials in `whatsapp_bot.py`.

8. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

## Usage

1. Start the FastAPI backend:
   ```
   python main.py
   ```

2. Start the WhatsApp bot server:
   ```
   python whatsapp_bot.py
   ```

3. Start the React frontend:
   ```
   cd frontend
   npm start
   ```

4. Access the web interface at `http://localhost:3000`.

5. To use the WhatsApp bot, configure your Twilio webhook to point to your server's `/whatsapp` endpoint.

## API Endpoints

- `POST /analyze_content`: Submit content for analysis
- `GET /verify_content/{content_hash}`: Verify previously analyzed content

## Future Improvements

- Implement more sophisticated AI models for pattern detection
- Enhance blockchain integration with smart contracts
- Improve the user interface and add more features
- Implement user authentication and authorization
- Optimize performance and scalability
- Add support for more languages and content types

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
