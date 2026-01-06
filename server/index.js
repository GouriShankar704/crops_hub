/* Simple Express server to proxy requests to OpenAI
   Usage:
   1. Create a .env file with OPENAI_API_KEY='sk-...'
   2. Run: node server/index.js
   3. POST /api/chat { question }
*/

const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.warn("Warning: OPENAI_API_KEY is not set. Set it in .env to enable OpenAI requests.");
}

app.post("/api/chat", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "question is required" });
    }

    if (!OPENAI_KEY) {
      return res.status(500).json({ error: "OpenAI API key not configured on server" });
    }

    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that answers simple farming questions concisely." },
        { role: "user", content: question },
      ],
      temperature: 0.2,
      max_tokens: 400,
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const text = await r.text();
      console.error("OpenAI error", r.status, text);
      return res.status(502).json({ error: "OpenAI request failed" });
    }

    const data = await r.json();
    const content = data?.choices?.[0]?.message?.content ?? "I'm unable to answer that right now.";

    return res.json({ answer: content });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

// Simple conversation storage using a JSON file - good enough for demo/persistence
const fs = require("fs");
const path = require("path");
const DATA_DIR = path.join(__dirname, "data");
const CONV_FILE = path.join(DATA_DIR, "conversations.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(CONV_FILE)) fs.writeFileSync(CONV_FILE, JSON.stringify([]));
}

async function readConversations() {
  ensureDataFile();
  const raw = await fs.promises.readFile(CONV_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeConversations(list) {
  ensureDataFile();
  await fs.promises.writeFile(CONV_FILE, JSON.stringify(list, null, 2), "utf-8");
}

// GET all conversations
app.get("/api/conversations", async (req, res) => {
  try {
    const list = await readConversations();
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

// POST to create new conversation or append a message
// body: { conversationId?, title?, message?: { type, text, ts } }
app.post("/api/conversations", async (req, res) => {
  try {
    const { conversationId, title, message } = req.body;
    const list = await readConversations();

    if (!conversationId) {
      // create
      const id = Date.now().toString();
      const conv = { id, title: title || `Conversation ${id}`, messages: message ? [message] : [] };
      list.unshift(conv);
      await writeConversations(list);
      return res.json(conv);
    }

    // find and append
    const idx = list.findIndex((c) => c.id === conversationId);
    if (idx === -1) return res.status(404).json({ error: "not_found" });
    if (message) list[idx].messages.push(message);
    await writeConversations(list);
    return res.json(list[idx]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

// DELETE a conversation
app.delete("/api/conversations/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const list = await readConversations();
    const filtered = list.filter((c) => c.id !== id);
    await writeConversations(filtered);
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`Chat server listening on port ${PORT}`));
