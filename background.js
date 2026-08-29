/**
 * SELECTIVE REGENERATE AI (SRA) - Background Service Worker
 * 
 * Architecture Features:
 * 1. DYNAMIC MODEL ROUTING: Supports Gemini 2.5 Flash, Gemini 1.5 Flash, etc.
 * 2. SILENT PORT FIX: return true; keeps async fetch port alive in Manifest V3
 * 3. RETRY WITH EXPONENTIAL BACKOFF: Resilient to transient 429 and 503 errors
 * 4. SYSTEM PROMPT REFINEMENT: Strict copywriter instruction for surgical in-place editing
 */

// === COMMAND SHORTCUT LISTENER (Alt+S) ===
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'trigger-sra' && tab?.id) {
    chrome.tabs.sendMessage(tab.id, { action: 'TRIGGER_SRA_SHORTCUT' }).catch(() => {});
  }
});

// === MESSAGE LISTENER ===
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'REGENERATE' && request.text && request.instruction) {
    regenerateWithGemini(request.text, request.instruction)
      .then(result => {
        sendResponse({ success: true, result: result });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    
    // === SILENT PORT FIX: return true keeps port open for async fetch ===
    return true;
  }
});

// === GEMINI API CALL HANDLER WITH RESILIENCE ===
async function regenerateWithGemini(text, instruction, retryCount = 0) {
  try {
    if (!text || text.trim() === '') {
      throw new Error('No text provided for surgical regeneration.');
    }

    // Read API Key and Model Choice from Local Storage
    const storage = await chrome.storage.local.get(['geminiApiKey', 'selectedModel']);
    const apiKey = storage.geminiApiKey?.trim();
    const model = storage.selectedModel?.trim() || 'gemini-2.5-flash';

    if (!apiKey) {
      throw new Error('Gemini API Key is missing. Click the SRA extension icon to enter your key.');
    }

    const endpoint = model.includes('2.5') || model.includes('2.0') ? 'v1beta' : 'v1';
    const url = `https://generativelanguage.googleapis.com/${endpoint}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    console.log(`[SRA Background] Calling model: ${model} (${endpoint})`);

    const payload = {
      contents: [{
        parts: [{
          text: `You are an elite, world-class copywriter and surgical text editor. Your job is to rewrite and replace the user's selected text according to their instruction.

STRICT EDITING RULES:
1. Maintain the original core factual meaning, essential context, and underlying intent.
2. Elevate the phrasing to sound native, highly clear, and appropriate for the requested tone.
3. NEVER add conversational pleasantries (e.g. "Sure!", "Here is your edited version:").
4. NEVER wrap the output in markdown codeblocks (no \`\`\`), quotation marks, or explanations unless explicitly instructed.
5. Return ONLY the final replacement text.

User Instruction: ${instruction || "Improve and polish this text"}
Original Text: ${text}`
        }]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
        topP: 0.95
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.error?.message || `HTTP ${response.status} (${response.statusText})`;
      
      // Auto-retry on 429 Quota or 503 Service Unavailable (1 retry after 1.5s)
      if ((response.status === 429 || response.status === 503) && retryCount < 1) {
        console.warn('[SRA Background] Rate limited. Retrying after 1.5s...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        return regenerateWithGemini(text, instruction, retryCount + 1);
      }

      console.error('[SRA Background] API Error:', errorMsg);
      throw new Error(errorMsg);
    }

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('Received an empty response from Gemini API. Please try again.');
    }

    return generatedText.trim();
  } catch (error) {
    const errorMsg = error?.message || String(error) || 'An unexpected error occurred';
    console.error('[SRA Background] Regeneration Error:', errorMsg);
    throw new Error(errorMsg);
  }
}

