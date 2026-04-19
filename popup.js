/**
 * Selective Regenerate AI - Popup Script
 * Handles API key configuration and model selection
 * Universal bridge for Gemini API
 */

document.addEventListener('DOMContentLoaded', async () => {
  const apiKeyInput = document.getElementById('apiKey');
  const modelSelect = document.getElementById('modelSelect');
  const saveBtn = document.getElementById('saveBtn');
  const testBtn = document.getElementById('testBtn');
  const clearBtn = document.getElementById('clearBtn');
  const statusDiv = document.getElementById('status');

  // Load saved API key and model
  const stored = await chrome.storage.local.get(['geminiApiKey', 'selectedModel']);
  if (stored.geminiApiKey) {
    apiKeyInput.value = stored.geminiApiKey;
  }
  if (stored.selectedModel) {
    modelSelect.value = stored.selectedModel;
  } else {
    // Default to Gemini 2.5 Flash
    modelSelect.value = 'gemini-2.5-flash';
  }

  // Save API key and model
  saveBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    const selectedModel = modelSelect.value;
    
    if (!apiKey) {
      showStatus('Please enter an API key', 'error');
      return;
    }
    
    await chrome.storage.local.set({ 
      geminiApiKey: apiKey,
      selectedModel: selectedModel 
    });
    showStatus(`✅ Settings saved! Using model: ${selectedModel}`, 'success');
  });

  // Test connection with selected model
  testBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    const selectedModel = modelSelect.value;
    
    if (!apiKey) {
      showStatus('Please enter an API key first', 'error');
      return;
    }

    testBtn.disabled = true;
    showStatus('🔄 Testing connection with ' + selectedModel + '...', 'info');

    try {
      // Build URL with selected model (v1beta for 2.5-flash, v1 for others)
      const endpoint = selectedModel === 'gemini-2.5-flash' ? 'v1beta' : 'v1';
      const testUrl = `https://generativelanguage.googleapis.com/${endpoint}/models/${selectedModel}:generateContent?key=${encodeURIComponent(apiKey)}`;
      
      console.log(`[SRA Popup] Testing API key with model: ${selectedModel}`);
      console.log(`[SRA Popup] Testing URL: https://generativelanguage.googleapis.com/${endpoint}/models/${selectedModel}:generateContent?key=[REDACTED]`);

      const response = await fetch(testUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: 'Say "OK" only.' }] 
          }],
          generationConfig: { 
            maxOutputTokens: 10,
            temperature: 0.3
          }
        })
      });

      console.log('[SRA Popup] Response status:', response.status);

      if (response.ok) {
        await chrome.storage.local.set({ 
          geminiApiKey: apiKey,
          selectedModel: selectedModel 
        });
        showStatus(`✅ Connection successful! Model "${selectedModel}" is working with your API key.`, 'success');
      } else if (response.status === 400) {
        console.error('[SRA Popup] 400 Bad Request - Invalid API key or malformed request');
        showStatus('❌ Invalid API key format or bad request. Check your credentials.', 'error');
      } else if (response.status === 401) {
        console.error('[SRA Popup] 401 Unauthorized - API key is invalid');
        showStatus('❌ Invalid API key. Please check and try again.', 'error');
      } else if (response.status === 403) {
        console.error('[SRA Popup] 403 Forbidden - Access denied');
        showStatus('❌ Access denied. Enable Generative Language API in Google Cloud Console.', 'error');
      } else if (response.status === 404) {
        console.error('[SRA Popup] 404 Not Found - Model not available for this key');
        showStatus(`❌ Model "${selectedModel}" not found. This model may not be available on your API tier.`, 'error');
      } else if (response.status === 429) {
        console.warn('[SRA Popup] 429 Too Many Requests - Quota exceeded');
        showStatus('⏱️ Quota exceeded. Wait 20-30 seconds and try again.', 'error');
      } else {
        const data = await response.json();
        console.error('[SRA Popup] Error response:', data);
        showStatus(`❌ Error: ${data.error?.message || response.statusText}`, 'error');
      }
    } catch (error) {
      console.error('[SRA Popup] Network or fetch error:', error);
      showStatus(`❌ Connection failed: ${error.message}`, 'error');
    } finally {
      testBtn.disabled = false;
    }
  });

  // Clear all settings
  clearBtn.addEventListener('click', async () => {
    await chrome.storage.local.set({ 
      geminiApiKey: '',
      selectedModel: 'gemini-2.5-flash'
    });
    apiKeyInput.value = '';
    modelSelect.value = 'gemini-2.5-flash';
    showStatus('🗑️ Settings cleared. Reset to Gemini 2.5 Flash.', 'info');
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    if (type !== 'info') {
      setTimeout(() => {
        statusDiv.className = 'status';
      }, 3500);
    }
  }
});
