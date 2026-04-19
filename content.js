/**
 * SURGICAL BRIDGE - Content Script with Floating Prompt Menu
 * 
 * Architecture Rules:
 * 1. GHOST SELECTION FIX: Lock selection on mouseup, not click
 * 2. MACHINE GUN FIX: Prevent simultaneous requests with isGenerating flag
 * 3. ORPHAN CONTEXT FIX: Check chrome.runtime availability before sendMessage
 * 4. REACT SYNC FIX: Dispatch 'input' event after DOM edit
 */

// === STATE ===
let lockedText = '';
let lockedRange = null;
let isGenerating = false;
let shadowRoot = null;

// === INITIALIZATION ===
// Use capture phase to catch events before controlled sites can block them
document.addEventListener('mouseup', lockSelection, { capture: true });
document.addEventListener('touchend', lockSelection, { capture: true });

// === SELECTION LOCKING (Ghost Selection Fix) ===
function lockSelection() {
  const selection = window.getSelection();
  const text = selection.toString().trim();
  
  if (!text) {
    hideButton();
    return;
  }

  lockedText = text;
  lockedRange = selection.rangeCount > 0 ? selection.getRangeAt(0).cloneRange() : null;

  if (!lockedRange) {
    hideButton();
    return;
  }

  showButton(selection);
}

// === BUTTON DISPLAY ===
function showButton(selection) {
  hideButton();
  const shadow = getShadowRoot();
  
  const button = document.createElement('button');
  button.id = 'sra-btn';
  button.textContent = '✨ SRA';
  button.style.cssText = `
    position: fixed; z-index: 2147483647 !important; padding: 8px 14px;
    background: linear-gradient(135deg, #4285f4, #3367d6); color: white;
    border: none; border-radius: 6px; font-size: 13px; font-weight: 600;
    cursor: pointer; box-shadow: 0 2px 12px rgba(66,133,244,0.4);
    white-space: nowrap; transition: all 0.2s;
  `;

  button.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    showPromptMenu(selection);
  });

  button.addEventListener('mouseover', () => {
    button.style.background = 'linear-gradient(135deg, #3367d6, #2551b0)';
    button.style.boxShadow = '0 4px 16px rgba(66,133,244,0.6)';
  });

  button.addEventListener('mouseout', () => {
    button.style.background = 'linear-gradient(135deg, #4285f4, #3367d6)';
    button.style.boxShadow = '0 2px 12px rgba(66,133,244,0.4)';
  });

  if (selection.rangeCount > 0) {
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    button.style.top = (rect.bottom + 12) + 'px';
    button.style.left = Math.max(10, rect.left) + 'px';
  }

  shadow.appendChild(button);
}

function hideButton() {
  const shadow = shadowRoot;
  if (shadow) {
    const btn = shadow.getElementById('sra-btn');
    if (btn) btn.remove();
  }
}

// === FLOATING PROMPT MENU ===
function showPromptMenu(selection) {
  hideButton();
  const shadow = getShadowRoot();

  const menu = document.createElement('div');
  menu.id = 'sra-menu';
  menu.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    z-index: 2147483647 !important; background: white; border-radius: 12px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.15); padding: 20px;
    min-width: 280px; animation: slideIn 0.2s ease;
  `;

  // Title
  const title = document.createElement('div');
  title.style.cssText = 'font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px;';
  title.textContent = 'How would you like to regenerate?';
  menu.appendChild(title);

  // Preset buttons
  const presets = [
    { icon: '🪄', label: 'Simplify', instruction: 'Simplify this text while keeping the main message.' },
    { icon: '💡', label: 'Add Example', instruction: 'Add a concrete example to illustrate the point.' },
    { icon: '❓', label: 'Generate Quiz', instruction: 'Generate 3 quiz questions based on this text.' }
  ];

  presets.forEach(preset => {
    const btn = document.createElement('button');
    btn.textContent = `${preset.icon} ${preset.label}`;
    btn.style.cssText = `
      display: block; width: 100%; padding: 12px; margin-bottom: 8px;
      background: #f5f5f5; color: #333; border: 1px solid #e0e0e0;
      border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500;
      transition: all 0.15s ease;
    `;
    
    btn.addEventListener('mouseover', () => {
      btn.style.background = '#4285f4';
      btn.style.color = 'white';
      btn.style.borderColor = '#4285f4';
    });
    
    btn.addEventListener('mouseout', () => {
      btn.style.background = '#f5f5f5';
      btn.style.color = '#333';
      btn.style.borderColor = '#e0e0e0';
    });
    
    btn.addEventListener('click', () => {
      triggerRegeneration(preset.instruction);
      shadow.removeChild(menu);
    });
    
    menu.appendChild(btn);
  });

  // Divider
  const divider = document.createElement('div');
  divider.style.cssText = 'height: 1px; background: #e0e0e0; margin: 12px 0;';
  menu.appendChild(divider);

  // Custom instruction section
  const customLabel = document.createElement('div');
  customLabel.style.cssText = 'font-size: 12px; font-weight: 600; color: #666; margin-bottom: 8px;';
  customLabel.textContent = 'Or give custom instructions:';
  menu.appendChild(customLabel);

  const customInput = document.createElement('input');
  customInput.type = 'text';
  customInput.placeholder = 'e.g., "Make it more formal"';
  customInput.style.cssText = `
    width: 100%; padding: 8px 10px; border: 1px solid #ddd;
    border-radius: 4px; font-size: 13px; margin-bottom: 8px;
    box-sizing: border-box;
  `;
  // Prevent input click from bubbling to close handler
  customInput.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });
  customInput.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  menu.appendChild(customInput);

  const goBtn = document.createElement('button');
  goBtn.textContent = 'Go';
  goBtn.style.cssText = `
    width: 100%; padding: 10px; background: #4285f4; color: white;
    border: none; border-radius: 4px; cursor: pointer; font-weight: 600;
    font-size: 13px; transition: all 0.15s ease;
  `;
  
  goBtn.addEventListener('mouseover', () => {
    goBtn.style.background = '#3367d6';
  });
  
  goBtn.addEventListener('mouseout', () => {
    goBtn.style.background = '#4285f4';
  });
  
  goBtn.addEventListener('click', () => {
    const customInstruction = customInput.value.trim();
    if (customInstruction) {
      triggerRegeneration(customInstruction);
      shadow.removeChild(menu);
    }
  });
  
  menu.appendChild(goBtn);

  // Add animation
  const style = document.createElement('style');
  style.textContent = '@keyframes slideIn { from { opacity: 0; transform: translate(-50%, -55%); } to { opacity: 1; transform: translate(-50%, -50%); } }';
  shadow.appendChild(style);
  shadow.appendChild(menu);

  // Close on outside click
  const closeHandler = (e) => {
    // Check if menu element still exists in shadow DOM
    if (!shadow.contains(e.target) && menu.parentNode === shadow) {
      try {
        shadow.removeChild(menu);
      } catch (err) {
        // Menu already removed
      }
      document.removeEventListener('click', closeHandler);
    }
  };
  
  setTimeout(() => {
    document.addEventListener('click', closeHandler);
  }, 50);
}

// === REGENERATION TRIGGER ===
function triggerRegeneration(instruction) {
  if (isGenerating) {
    console.log('[SRA] Already regenerating');
    return;
  }

  if (!lockedText || !lockedRange) {
    showError('No text locked for regeneration');
    return;
  }

  isGenerating = true;
  
  console.log('[SRA] Locked Text:', lockedText);
  console.log('[SRA] Instruction:', instruction);

  if (!chrome.runtime || !chrome.runtime.sendMessage) {
    showError('Please refresh the page');
    isGenerating = false;
    return;
  }

  showLoading();

  chrome.runtime.sendMessage(
    {
      action: 'REGENERATE',
      text: lockedText,
      instruction: instruction
    },
    (response) => {
      isGenerating = false;
      hideLoading();

      if (!response) {
        showError('No response from API');
        return;
      }

      if (response.success && response.result) {
        try {
          lockedRange.deleteContents();
          lockedRange.insertNode(document.createTextNode(response.result));

          const parent = lockedRange.commonAncestorContainer.parentElement || document.body;
          parent.dispatchEvent(new Event('input', { bubbles: true }));
          parent.dispatchEvent(new Event('change', { bubbles: true }));

          // Auto-copy to clipboard for universal website compatibility
          navigator.clipboard.writeText(response.result)
            .then(() => {
              showToast('✅ Replaced & Copied to Clipboard!');
            })
            .catch(() => {
              // Fallback: still show success even if copy fails
              showSuccess('✓ Text updated successfully!');
            });

          lockedText = '';
          lockedRange = null;
        } catch (error) {
          showError('Failed to apply changes: ' + error.message);
        }
      } else {
        showError(response.error || 'Regeneration failed');
      }
    }
  );
}

// === UI HELPERS ===
function getShadowRoot() {
  if (shadowRoot) return shadowRoot;

  let host = document.getElementById('sra-host');
  if (!host) {
    host = document.createElement('div');
    host.id = 'sra-host';
    host.style.cssText = 'all: initial; position: fixed; z-index: 2147483647 !important;';
    document.body.appendChild(host);
  }

  if (!host.shadowRoot) {
    shadowRoot = host.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      #sra-btn, #sra-menu, #sra-loader { z-index: 2147483647 !important; }
    `;
    shadowRoot.appendChild(style);
  } else {
    shadowRoot = host.shadowRoot;
  }

  return shadowRoot;
}

function showLoading() {
  const shadow = getShadowRoot();
  const loader = document.createElement('div');
  loader.id = 'sra-loader';
  loader.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    z-index: 2147483647 !important; background: white; padding: 32px; border-radius: 12px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.15); text-align: center;
  `;
  loader.innerHTML = `
    <div style="font-size: 14px; color: #666; margin-bottom: 16px;">Regenerating...</div>
    <div style="width: 40px; height: 40px; border: 3px solid #f0f0f0; border-top: 3px solid #4285f4; border-radius: 50%; margin: 0 auto; animation: spin 1s linear infinite;"></div>
  `;
  shadow.appendChild(loader);
}

function hideLoading() {
  const shadow = shadowRoot;
  if (shadow) {
    const loader = shadow.getElementById('sra-loader');
    if (loader) loader.remove();
  }
}

function showError(msg) {
  const shadow = getShadowRoot();
  const box = document.createElement('div');
  box.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 2147483647 !important;
    background: #ffebee; color: #c62828; padding: 16px; border-radius: 8px;
    border: 1px solid #ef5350; max-width: 420px; font-size: 13px;
  `;
  box.innerHTML = `<strong>❌ Error:</strong> ${escapeHtml(msg)}`;
  shadow.appendChild(box);
  setTimeout(() => box.remove(), 6000);
}

function showSuccess(msg) {
  const shadow = getShadowRoot();
  const box = document.createElement('div');
  box.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 2147483647 !important;
    background: #e8f5e9; color: #2e7d32; padding: 16px; border-radius: 8px;
    border: 1px solid #66bb6a; font-size: 13px;
  `;
  box.textContent = msg;
  shadow.appendChild(box);
  setTimeout(() => box.remove(), 3500);
}

function showToast(msg) {
  const shadow = getShadowRoot();
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 2147483647 !important;
    background: #1a1a1a; color: #ffffff; padding: 14px 18px; border-radius: 6px;
    font-size: 13px; font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    opacity: 1; transition: opacity 0.3s ease;
  `;
  toast.textContent = msg;
  shadow.appendChild(toast);
  
  // Fade out and remove after 2.5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode === shadow) {
        shadow.removeChild(toast);
      }
    }, 300);
  }, 2500);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
