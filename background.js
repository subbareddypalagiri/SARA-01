/**
 * SURGICAL BRIDGE - Background Script (Service Worker)
 * 
 * Architecture Rules:
 * 1. SILENT PORT FIX: return true; keeps async fetch port open
 * 2. API CALL: Direct to Gemini v1beta API (gemini-2.5-flash)
 * 3. ERROR HANDLING: try-catch, parse JSON, extract exact Google error
 * 4. RESPONSE: { success: true, result } or { success: false, error }
 */

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

// === GEMINI API HANDLER ===
async function regenerateWithGemini(text, instruction) {
  try {
    // Validate input
    if (!text || text.trim() === '') {
      throw new Error('No text was sent to the background script.');
    }

    // Get API key from storage
    const storage = await chrome.storage.local.get(['geminiApiKey']);
    const apiKey = storage.geminiApiKey?.trim();

    if (!apiKey) {
      throw new Error('API Key is missing in storage.');
    }

    // Build request with instruction + text
    const fullPrompt = `Instructions: ${instruction}\n\nOriginal Text: "${text}"\n\nProvide ONLY the regenerated text. No conversational filler, no quotes.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    console.log('[SRA] Using model: gemini-2.5-flash');
    console.log('[SRA] Instruction:', instruction);
    console.log('[SRA] Fetching from: ' + url.split('key=')[0] + 'key=[REDACTED]');

    // === API CALL: POST to Gemini v1beta ===
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: fullPrompt }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048
        }
      })
    });

    console.log('[SRA] API response status:', response.status);

    const data = await response.json();

    // === ERROR HANDLING: Extract exact Google error ===
    if (!response.ok) {
      const errorMsg = data.error?.message || `HTTP ${response.status}`;
      console.error('[SRA] API Error:', errorMsg);
      throw new Error(errorMsg);
    }

    // Extract generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      console.error('[SRA] No text in response:', JSON.stringify(data));
      throw new Error('No response from Gemini API. Please try again.');
    }

    console.log('[SRA] Regeneration successful. Output length:', generatedText.length);
    return generatedText.trim();

  } catch (error) {
    const errorMessage = error?.message || String(error) || 'Unknown error occurred';
    console.error('[SRA] Error:', errorMessage);
    throw new Error(errorMessage);
  }
}
