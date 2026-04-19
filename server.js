require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

// Validate API key
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY not found in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// CORS configuration - explicitly allow ChatGPT and localhost
const corsOptions = {
  origin: [
    'https://chatgpt.com',
    'https://chat.openai.com',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Homepage
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Selective Regenerate AI - Backend</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          background: #f5f5f5;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #10a37f; margin-top: 0; }
        .status { 
          background: #d4edda; 
          padding: 15px; 
          border-radius: 8px; 
          margin: 20px 0; 
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .instructions {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .instructions li { margin: 10px 0; }
        code {
          background: #e9ecef;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
        }
        .endpoint {
          background: #fff;
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 6px;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Selective Regenerate AI Backend</h1>
        
        <div class="status">
          ✅ Server is running on port ${PORT}
        </div>
        
        <h2>📋 Available Endpoints</h2>
        <div class="endpoint">
          <strong>GET</strong> <code>/health</code> - Health check
        </div>
        <div class="endpoint">
          <strong>POST</strong> <code>/api/regenerate</code> - Main regeneration endpoint
        </div>
        
        <div class="instructions">
          <h3>How to use the Chrome Extension:</h3>
          <ol>
            <li>Make sure this backend is running (npm start)</li>
            <li>Install the Chrome extension:
              <ul>
                <li>Open Chrome and go to <code>chrome://extensions/</code></li>
                <li>Enable "Developer mode" (top right)</li>
                <li>Click "Load unpacked"</li>
                <li>Select the extension folder</li>
              </ul>
            </li>
            <li>Go to <strong>ChatGPT</strong> (chat.openai.com or chatgpt.com)</li>
            <li>Select any text in ChatGPT's responses</li>
            <li>Click the ✨ button that appears</li>
            <li>Choose: Fix, Improve, Simplify, or Expand</li>
            <li>Preview and apply the changes!</li>
          </ol>
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          Note: This extension works on <strong>ChatGPT</strong>, not on this page. 
          This page is just the backend server status.
        </p>
      </div>
    </body>
    </html>
  `);
});

// Main regeneration endpoint
app.post("/api/regenerate", async (req, res) => {
  try {
    const { text, prompt, full_prompt } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }
    
    const finalPrompt = full_prompt || `${prompt || "Improve this text:"}\n\n"${text}"\n\nProvide only the improved text.`;
    
    console.log("[API] Processing request...");
    
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const improved = response.text().trim();
    
    console.log("[API] ✅ Success");
    
    res.json({
      result: improved,
      improved_text: improved,
      source: "gemini"
    });
  } catch (error) {
    console.error("[API] ❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║  🚀 Selective Regenerate AI Backend  ║
║  Port: http://localhost:${PORT}           ║
║  Status: READY ✅                    ║
╚══════════════════════════════════════╝
  `);
});
