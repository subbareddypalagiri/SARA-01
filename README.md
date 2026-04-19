# Selective Regenerate AI (SRA)

**Bring Your Own Key (BYOK)** Chrome extension for surgically editing AI responses on ChatGPT using Gemini 1.5 Flash.

## Features

✨ **Selective Text Regeneration** - Choose any text in ChatGPT messages and regenerate with multiple options:
- **Improve** - Make text more clear and impactful
- **Simplify** - Reduce complexity while keeping meaning
- **Fix** - Correct grammar, spelling, and punctuation
- **Expand** - Add more detail and examples

🔒 **BYOK (Bring Your Own Key)** - Your Gemini API key stays on your device, never stored on any server

🎯 **Shadow DOM Isolation** - Extension UI won't be affected by ChatGPT's CSS

⚡ **Gemini 1.5 Flash** - Optimized for quota stability and fast responses

🔄 **React State Syncing** - Text replacements properly trigger ChatGPT's React state updates

## Installation

### 1. Get Your Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 2. Load Extension in Chrome
1. Open `chrome://extensions/`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select this folder

### 3. Configure API Key
1. Click the **SRA** extension icon in Chrome toolbar
2. Paste your Gemini API key
3. Click **Test Connection** to verify
4. Click **Save Key**

## Usage

1. Go to [ChatGPT](https://chatgpt.com)
2. Select any text in a ChatGPT message
3. Click the **✨ SRA** button that appears
4. Choose: **Improve**, **Simplify**, **Fix**, or **Expand**
5. Review the changes in the preview
6. Click **Apply Changes** to update the text

## Architecture

### manifest.json
- **Manifest v3** - Latest Chrome extension standard
- Permissions: `storage`, `scripting`, `activeTab`
- Host permissions: ChatGPT and Google Generative AI API

### popup.html & popup.js
- API key input and validation UI
- Test connection button for verification
- Saves key securely to `chrome.storage.local`

### background.js
- Service worker that handles all Gemini API calls
- Direct fetch to `gemini-1.5-flash:generateContent`
- Robust error handling (429 quota errors, invalid keys, network issues)
- Keeps API key safe from content script

### content.js
- **Shadow DOM** for UI isolation from ChatGPT styles
- Text selection detection
- Floating button injection
- Inline diff preview (before/after)
- **React state syncing** via `input` and `change` events
- Message escaping for security

## Error Handling

- **No API Key** → Clear message directing to settings
- **Invalid API Key** → "Invalid API key" error
- **Quota Exceeded (429)** → "Quota exceeded! Please wait 20 seconds"
- **Network Errors** → Clear error messages with recovery options

## Security

✅ API key stored locally in `chrome.storage.local` (encrypted by Chrome)
✅ No backend server - direct connection to Google's API
✅ No telemetry or tracking
✅ No data sent to third parties
✅ HTML content properly escaped to prevent XSS

## File Structure

```
.
├── manifest.json          # Chrome extension configuration
├── popup.html             # Settings UI
├── popup.js               # Settings logic
├── background.js          # Service worker (API calls)
├── content.js             # Content script (UI injection)
├── styles.css             # Popup styling
└── README.md              # This file
```

## Tech Stack

- **Chrome Extensions API** (v3)
- **Gemini 1.5 Flash API** - Fast, quota-stable model
- **Shadow DOM** - CSS isolation
- **Vanilla JavaScript** - No dependencies

## Troubleshooting

### Extension doesn't appear on ChatGPT
- Reload the extension (chrome://extensions)
- Refresh the ChatGPT page
- Check console for errors (F12 → Console)

### API calls failing
- Verify your API key is valid (use Test Connection button)
- Check internet connection
- Ensure API is enabled in Google Cloud Console

### Text not updating in ChatGPT
- The content may be in an input field (not editable text)
- Try selecting exact text without extra whitespace
- Refresh the page and try again

## Development

To modify the extension:
1. Edit the relevant file
2. Go to `chrome://extensions/`
3. Click the refresh icon on the SRA extension
4. Reload ChatGPT tab

## API Cost

- Gemini 1.5 Flash requests cost ~$0.075 per million input tokens
- Typical request: 50-500 tokens (~$0.0000038-$0.000038)
- [Pricing details](https://ai.google.dev/pricing)

---

**Built with ❤️ for precise AI text editing**

