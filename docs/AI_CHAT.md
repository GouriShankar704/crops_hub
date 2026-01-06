# AI Chat Server Setup

This project includes a minimal Express server at `server/index.js` that proxies questions to OpenAI's Chat Completions API.

## Setup
1. Copy `.env.example` to `.env` and set your key:

   ```text
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
   ```

2. Install new dependencies:
   - `npm install express cors dotenv`

3. Start the server:
   - `npm run server`

4. Start the dev frontend in another terminal:
   - `npm run dev`

5. Open the site and use the AI Assistant. If the server is not running or `OPENAI_API_KEY` is missing, the assistant falls back to local rule-based answers.

## Important
- Do NOT commit your `.env` with the real API key to version control.
- Keep usage conservative to avoid unexpected costs.
