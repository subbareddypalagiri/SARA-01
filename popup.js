/**
 * Selective Regenerate AI (SRA) - Enterprise Popup Script
 * Handles BYOK Gemini API key configuration and dynamic model routing
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
    modelSelect.value = 'gemini-2.5-flash';
  }

  // Save API key and model
  saveBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    const selectedModel = modelSelect.value;
    
    if (!apiKey) {
      showStatus('Please enter a valid Gemini API key.', 'error');
      return;
    }
    
    await chrome.storage.local.set({ 
      geminiApiKey: apiKey,
      selectedModel: selectedModel 
    });
    showStatus(`Settings saved successfully! Active Model: ${selectedModel}`, 'success');
  });

  // Test connection with selected model
  testBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    const selectedModel = modelSelect.value;
    
    if (!apiKey) {
      showStatus('Please enter an API key first.', 'error');
      return;
    }

    testBtn.disabled = true;
    showStatus('Testing connection with Google Gemini endpoint...', 'info');

    try {
      const endpoint = selectedModel.includes('2.5') || selectedModel.includes('2.0') ? 'v1beta' : 'v1';
      const testUrl = `https://generativelanguage.googleapis.com/${endpoint}/models/${encodeURIComponent(selectedModel)}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const response = await fetch(testUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: 'Respond "CONNECTED" only.' }] 
          }],
          generationConfig: { 
            maxOutputTokens: 10,
            temperature: 0.2
          }
        })
      });

      if (response.ok) {
        await chrome.storage.local.set({ 
          geminiApiKey: apiKey,
          selectedModel: selectedModel 
        });
        showStatus(`Connection verified! Model "${selectedModel}" is active and ready.`, 'success');
      } else if (response.status === 400) {
        showStatus('Invalid API key format or malformed request.', 'error');
      } else if (response.status === 401 || response.status === 403) {
        showStatus('Invalid API key or access denied. Please verify your Google AI Studio key.', 'error');
      } else if (response.status === 404) {
        showStatus(`Model "${selectedModel}" is not available for this key. Try Gemini 1.5 Flash.`, 'error');
      } else if (response.status === 429) {
        showStatus('Quota rate-limited. Please wait 20-30 seconds and test again.', 'error');
      } else {
        const data = await response.json();
        showStatus(`Error (${response.status}): ${data.error?.message || response.statusText}`, 'error');
      }
    } catch (error) {
      showStatus(`Connection failed: ${error.message}`, 'error');
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
    showStatus('Settings cleared. Reset to default configuration.', 'info');
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    if (type !== 'info') {
      setTimeout(() => {
        statusDiv.className = 'status';
      }, 4000);
    }
  }
});

