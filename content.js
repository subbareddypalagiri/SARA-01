/**
 * SELECTIVE REGENERATE AI (SRA) - Classic Luxury Edition
 * 
 * Aesthetic:
 * - Classic Ivory & Warm Roasted Espresso / Mahogany Palette (Zero Cyberpunk)
 * - Roman & Italic Serif Typography (Playfair / Georgia / Baskerville / Newsreader)
 * - Luxury Editorial Line Icons (Feather Quill, Classic Scroll, Diamond, Column, Book)
 * - Custom "Loadinggggg..." Elegant State
 * - React 18/19 Safe Cumulative TextNode Offset Mapping
 * - Multi-Platform Session Persistence & Keyboard Shortcut (Alt + S)
 */

// === CLASSIC & LUXURY VECTOR SVG ICONS ===
const ICONS = {
  quill: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>',
  book: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>',
  scissors: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>',
  pen: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/></svg>',
  expand: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
  pillar: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="3" x2="20" y2="3"/><line x1="4" y1="21" x2="20" y2="21"/><line x1="7" y1="3" x2="7" y2="21"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="17" y1="3" x2="17" y2="21"/></svg>',
  compass: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  lamp: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6v3h8v-3c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"/><line x1="9" y1="21" x2="15" y2="21"/></svg>',
  scroll: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>',
  undo: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  close: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>',
  arrowRight: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
};

// === STATE MANAGEMENT ===
let lockedText = '';
let lockedRange = null;
let isGenerating = false;
let isRehydrating = false;
let shadowRoot = null;

// === INITIALIZATION ===
document.addEventListener('mouseup', lockSelection, { capture: true });
document.addEventListener('touchend', lockSelection, { capture: true });

// Listen for browser-level Chrome Command shortcut (Alt+S)
if (chrome.runtime?.onMessage) {
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'TRIGGER_SRA_SHORTCUT') {
      handleShortcutTrigger();
    }
  });
}

// Window Capture Phase Listener
const handleKey = (e) => {
  if ((e.altKey && (e.key === 's' || e.key === 'S' || e.code === 'KeyS')) ||
      (e.ctrlKey && e.shiftKey && (e.key === 'S' || e.code === 'KeyS'))) {
    handleShortcutTrigger(e);
  }
};
window.addEventListener('keydown', handleKey, { capture: true });
document.addEventListener('keydown', handleKey, { capture: true });

function handleShortcutTrigger(e) {
  const selection = window.getSelection();
  if (selection && selection.toString().trim()) {
    if (e) e.preventDefault();
    lockSelection();
    showPromptMenu();
  }
}

// Start Universal Session Rehydration
initSessionRehydration();

// === SELECTION LOCKING ===
function lockSelection() {
  const selection = window.getSelection();
  const text = selection ? selection.toString().trim() : '';

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

// === FLOATING TRIGGER BUTTON (CLASSIC EMBOSSED PILL) ===
function showButton(selection) {
  hideButton();
  const shadow = getShadowRoot();

  const button = document.createElement('button');
  button.id = 'sra-btn';
  button.innerHTML = `<span class="sra-icon">${ICONS.quill}</span><span>SRA</span>`;
  
  button.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    showPromptMenu();
  });

  if (selection.rangeCount > 0) {
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    const topPos = Math.min(window.innerHeight - 50, Math.max(10, rect.bottom + 8));
    const leftPos = Math.min(window.innerWidth - 90, Math.max(10, rect.left));
    button.style.top = topPos + 'px';
    button.style.left = leftPos + 'px';
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

// === PROMPT & ACTION MENU (WHITE & WARM BROWN THEME) ===
function showPromptMenu() {
  hideButton();
  const shadow = getShadowRoot();

  const existingMenu = shadow.getElementById('sra-menu');
  if (existingMenu) existingMenu.remove();

  const menu = document.createElement('div');
  menu.id = 'sra-menu';

  menu.innerHTML = `
    <div class="sra-menu-header">
      <div class="sra-brand">
        <span class="sra-brand-icon">${ICONS.quill}</span>
        <span class="sra-brand-title">Selective Regenerate AI</span>
      </div>
      <div class="sra-header-actions">
        <span class="sra-badge">Alt + S</span>
        <button class="sra-close-btn" id="sra-menu-close">${ICONS.close}</button>
      </div>
    </div>

    <div class="sra-selected-preview">
      <div class="sra-preview-label">Selected Passage</div>
      <div class="sra-preview-text">"${escapeHtml(truncate(lockedText, 120))}"</div>
    </div>

    <div class="sra-section-title">QUICK ACTIONS</div>
    <div class="sra-chips-grid">
      <button class="sra-chip" data-prompt="Improve and polish this text to make it exceptionally clear, elegant, and impactful.">
        <span class="sra-chip-icon">${ICONS.book}</span>
        <span>Improve</span>
      </button>
      <button class="sra-chip" data-prompt="Simplify this text to make it concise, natural, and easy to read.">
        <span class="sra-chip-icon">${ICONS.scissors}</span>
        <span>Simplify</span>
      </button>
      <button class="sra-chip" data-prompt="Fix all grammar, punctuation, phrasing, and spelling errors while preserving the original voice.">
        <span class="sra-chip-icon">${ICONS.pen}</span>
        <span>Fix Grammar</span>
      </button>
      <button class="sra-chip" data-prompt="Expand this text with rich context, illustrative details, and concrete examples.">
        <span class="sra-chip-icon">${ICONS.expand}</span>
        <span>Expand</span>
      </button>
    </div>

    <div class="sra-section-title">TONE & PERSONA</div>
    <div class="sra-chips-grid">
      <button class="sra-chip" data-prompt="Rewrite this in an elevated, high-level Executive and professional tone.">
        <span class="sra-chip-icon">${ICONS.pillar}</span>
        <span>Executive</span>
      </button>
      <button class="sra-chip" data-prompt="Rewrite this with technical precision, exact terminology, and analytical clarity.">
        <span class="sra-chip-icon">${ICONS.compass}</span>
        <span>Technical</span>
      </button>
      <button class="sra-chip" data-prompt="Explain Like I'm 5 (ELI5). Make it simple, intuitive, and engaging without complex jargon.">
        <span class="sra-chip-icon">${ICONS.lamp}</span>
        <span>ELI5</span>
      </button>
      <button class="sra-chip" data-prompt="Format and organize this text into crisp, readable bullet points.">
        <span class="sra-chip-icon">${ICONS.scroll}</span>
        <span>Bullets</span>
      </button>
    </div>

    <div class="sra-divider"></div>

    <div class="sra-custom-box">
      <input type="text" id="sra-custom-input" placeholder="Custom instructions (e.g., 'Make persuasive', 'Translate to Telugu')..." />
      <button id="sra-custom-submit">${ICONS.arrowRight}</button>
    </div>
  `;

  const closeBtn = menu.querySelector('#sra-menu-close');
  closeBtn.addEventListener('click', () => menu.remove());

  const chips = menu.querySelectorAll('.sra-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      menu.remove();
      triggerRegeneration(prompt);
    });
  });

  const customInput = menu.querySelector('#sra-custom-input');
  const customSubmit = menu.querySelector('#sra-custom-submit');

  const handleCustomSubmit = () => {
    const customPrompt = customInput.value.trim();
    if (customPrompt) {
      menu.remove();
      triggerRegeneration(customPrompt);
    }
  };

  customSubmit.addEventListener('click', handleCustomSubmit);
  customInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomSubmit();
    }
  });

  menu.addEventListener('mousedown', (e) => e.stopPropagation());
  menu.addEventListener('click', (e) => e.stopPropagation());

  shadow.appendChild(menu);

  setTimeout(() => {
    customInput.focus();
    const outsideClose = (e) => {
      if (!shadow.contains(e.target) && menu.parentNode === shadow) {
        menu.remove();
        document.removeEventListener('click', outsideClose);
      }
    };
    document.addEventListener('click', outsideClose);
  }, 60);
}

// === REGENERATION PIPELINE ===
function triggerRegeneration(instruction) {
  if (isGenerating) return;
  if (!lockedText || !lockedRange) {
    showError('No text selection locked. Please select text again.');
    return;
  }

  isGenerating = true;
  showLoading('Loadinggggg...');

  if (!chrome.runtime || !chrome.runtime.sendMessage) {
    hideLoading();
    isGenerating = false;
    showError('Extension context reloaded. Please refresh the page.');
    return;
  }

  const originalSelectionText = lockedText;
  const currentRange = lockedRange.cloneRange();

  chrome.runtime.sendMessage(
    {
      action: 'REGENERATE',
      text: originalSelectionText,
      instruction: instruction
    },
    (response) => {
      isGenerating = false;
      hideLoading();

      if (!response) {
        showError('No response received from Gemini service.');
        return;
      }

      if (response.success && response.result) {
        showDiffModal(originalSelectionText, response.result.trim(), currentRange);
      } else {
        showError(response.error || 'Failed to regenerate text.');
      }
    }
  );
}

// === DIFF MODAL (WHITE & WARM BROWN CLASSIC THEME) ===
function showDiffModal(originalText, newText, rangeToReplace) {
  const shadow = getShadowRoot();
  const diffHtml = computeWordDiffHtml(originalText, newText);

  const modal = document.createElement('div');
  modal.id = 'sra-diff-modal';
  modal.innerHTML = `
    <div class="sra-diff-container">
      <div class="sra-diff-header">
        <div class="sra-brand">
          <span class="sra-brand-icon">${ICONS.quill}</span>
          <span class="sra-brand-title">Review Surgical Changes</span>
        </div>
        <div class="sra-view-toggle">
          <button class="sra-toggle-btn active" id="sra-toggle-diff">Visual Diff</button>
          <button class="sra-toggle-btn" id="sra-toggle-clean">Clean Preview</button>
        </div>
      </div>

      <div class="sra-diff-body">
        <div class="sra-diff-content" id="sra-diff-view">${diffHtml}</div>
        <div class="sra-diff-content sra-hidden" id="sra-clean-view">${escapeHtml(newText)}</div>
      </div>

      <div class="sra-diff-legend">
        <span class="sra-legend-item"><span class="sra-legend-dot del"></span> Removed</span>
        <span class="sra-legend-item"><span class="sra-legend-dot ins"></span> Polished & Added</span>
      </div>

      <div class="sra-diff-footer">
        <button class="sra-btn-secondary" id="sra-diff-cancel">Cancel</button>
        <button class="sra-btn-primary" id="sra-diff-apply">
          <span>${ICONS.check}</span>
          <span>Apply Changes</span>
        </button>
      </div>
    </div>
  `;

  const btnDiff = modal.querySelector('#sra-toggle-diff');
  const btnClean = modal.querySelector('#sra-toggle-clean');
  const viewDiff = modal.querySelector('#sra-diff-view');
  const viewClean = modal.querySelector('#sra-clean-view');

  btnDiff.addEventListener('click', () => {
    btnDiff.classList.add('active');
    btnClean.classList.remove('active');
    viewDiff.classList.remove('sra-hidden');
    viewClean.classList.add('sra-hidden');
  });

  btnClean.addEventListener('click', () => {
    btnClean.classList.add('active');
    btnDiff.classList.remove('active');
    viewClean.classList.remove('sra-hidden');
    viewDiff.classList.add('sra-hidden');
  });

  modal.querySelector('#sra-diff-cancel').addEventListener('click', () => {
    modal.remove();
  });

  modal.querySelector('#sra-diff-apply').addEventListener('click', () => {
    modal.remove();
    applySurgicalReplacement(originalText, newText, rangeToReplace);
  });

  shadow.appendChild(modal);
}

// === MULTI-PARAGRAPH SAFE SURGICAL DOM MUTATION ===
function applySurgicalReplacement(originalText, newText, targetRange) {
  try {
    isRehydrating = true;

    safeReplaceRangeText(targetRange, originalText, newText);

    const patchId = 'patch_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const patchRecord = {
      id: patchId,
      originalText: originalText,
      replacedText: newText,
      startAnchor: originalText.substring(0, 45).trim(),
      endAnchor: originalText.substring(Math.max(0, originalText.length - 45)).trim(),
      timestamp: Date.now(),
      hostname: window.location.hostname
    };

    savePatchRecord(patchRecord);
    navigator.clipboard.writeText(newText).catch(() => {});
    showUndoPill(patchRecord);

    lockedText = '';
    lockedRange = null;
  } catch (err) {
    showError('Failed to apply replacement: ' + err.message);
  } finally {
    setTimeout(() => { isRehydrating = false; }, 300);
  }
}

function safeReplaceRangeText(range, originalText, newText) {
  if (!range) {
    replaceMatchingTextInAllContainers(originalText, newText);
    return;
  }

  if (range.startContainer === range.endContainer && range.startContainer.nodeType === Node.TEXT_NODE) {
    const node = range.startContainer;
    const val = node.nodeValue || '';
    node.nodeValue = val.substring(0, range.startOffset) + newText + val.substring(range.endOffset);
    return;
  }

  const commonAncestor = range.commonAncestorContainer;
  const walker = document.createTreeWalker(
    commonAncestor,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        try {
          return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        } catch (e) {
          return NodeFilter.FILTER_REJECT;
        }
      }
    }
  );

  const nodesInRange = [];
  let curr;
  while ((curr = walker.nextNode())) {
    nodesInRange.push(curr);
  }

  if (nodesInRange.length === 0) {
    replaceMatchingTextInAllContainers(originalText, newText);
    return;
  }

  const firstNode = nodesInRange[0];
  const firstVal = firstNode.nodeValue || '';
  const lastNode = nodesInRange[nodesInRange.length - 1];
  const lastVal = lastNode.nodeValue || '';

  if (nodesInRange.length === 1) {
    firstNode.nodeValue = firstVal.substring(0, range.startOffset) + newText + firstVal.substring(range.endOffset);
  } else {
    firstNode.nodeValue = firstVal.substring(0, range.startOffset) + newText;
    for (let i = 1; i < nodesInRange.length - 1; i++) {
      nodesInRange[i].nodeValue = '';
    }
    lastNode.nodeValue = lastVal.substring(range.endOffset);
  }
}

// === UNIVERSAL PERSISTENCE & AUTO-REHYDRATION ENGINE ===
async function savePatchRecord(patch) {
  if (!chrome.storage?.local) return;
  const res = await chrome.storage.local.get(['sra_all_patches']);
  const patches = res.sra_all_patches || [];
  patches.push(patch);
  await chrome.storage.local.set({ sra_all_patches: patches });
}

async function removePatchRecord(patchId) {
  if (!chrome.storage?.local) return;
  const res = await chrome.storage.local.get(['sra_all_patches']);
  let patches = res.sra_all_patches || [];
  patches = patches.filter(p => p.id !== patchId);
  await chrome.storage.local.set({ sra_all_patches: patches });
}

async function initSessionRehydration() {
  if (!chrome.storage?.local) return;

  const performRehydration = async () => {
    if (isRehydrating) return;
    const res = await chrome.storage.local.get(['sra_all_patches']);
    const patches = res.sra_all_patches;
    if (!patches || !patches.length) return;

    isRehydrating = true;
    for (const patch of patches) {
      replaceMatchingTextInAllContainers(patch.originalText, patch.replacedText, patch.startAnchor, patch.endAnchor);
    }
    setTimeout(() => { isRehydrating = false; }, 300);
  };

  setTimeout(performRehydration, 800);
  setTimeout(performRehydration, 2000);
  setTimeout(performRehydration, 4000);

  let timeoutId = null;
  const observer = new MutationObserver(() => {
    if (isRehydrating) return;
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(performRehydration, 600);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: false
  });
}

function replaceMatchingTextInAllContainers(originalText, replacedText, startAnchor, endAnchor) {
  if (!originalText || !replacedText || originalText === replacedText) return;

  const selectors = [
    'article',
    '[data-testid^="conversation-turn"]',
    '.markdown',
    '.prose',
    '.font-claude-message',
    'message-content',
    '.model-response-text',
    'main',
    'div[class*="message"]'
  ];

  let containers = document.querySelectorAll(selectors.join(', '));
  if (!containers || containers.length === 0) {
    containers = [document.body];
  }

  for (const container of containers) {
    if (container.closest('#sra-host')) continue;
    const textContent = container.textContent || '';
    
    if (!textContent.includes(originalText) && (!startAnchor || !textContent.includes(startAnchor))) {
      continue;
    }

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let n;
    while ((n = walker.nextNode())) {
      if (!n.parentElement?.closest('#sra-host')) {
        textNodes.push(n);
      }
    }

    let cumLength = 0;
    let combined = '';
    const nodeMap = [];

    for (let i = 0; i < textNodes.length; i++) {
      const val = textNodes[i].nodeValue || '';
      nodeMap.push({ node: textNodes[i], start: cumLength, end: cumLength + val.length, text: val });
      combined += val;
      cumLength += val.length;
    }

    let matchPos = combined.indexOf(originalText);
    let matchLen = originalText.length;

    if (matchPos === -1 && startAnchor && endAnchor) {
      const sPos = combined.indexOf(startAnchor);
      const ePos = combined.indexOf(endAnchor, sPos);
      if (sPos !== -1 && ePos !== -1) {
        matchPos = sPos;
        matchLen = (ePos + endAnchor.length) - sPos;
      }
    }

    if (matchPos !== -1) {
      const matchEnd = matchPos + matchLen;
      const affected = [];
      for (const nm of nodeMap) {
        if (nm.end > matchPos && nm.start < matchEnd) {
          affected.push(nm);
        }
      }

      if (affected.length > 0) {
        const first = affected[0];
        const last = affected[affected.length - 1];
        const firstOffset = Math.max(0, matchPos - first.start);
        const lastOffset = Math.min(last.text.length, matchEnd - last.start);

        if (affected.length === 1) {
          first.node.nodeValue = first.text.substring(0, firstOffset) + replacedText + first.text.substring(lastOffset);
        } else {
          first.node.nodeValue = first.text.substring(0, firstOffset) + replacedText;
          for (let k = 1; k < affected.length - 1; k++) {
            affected[k].node.nodeValue = '';
          }
          last.node.nodeValue = last.text.substring(lastOffset);
        }
        return true;
      }
    }
  }
}

// === UNDO TOAST (WARM PARCHMENT PILL) ===
function showUndoPill(patchRecord) {
  const shadow = getShadowRoot();
  const existingPill = shadow.getElementById('sra-undo-pill');
  if (existingPill) existingPill.remove();

  const pill = document.createElement('div');
  pill.id = 'sra-undo-pill';
  pill.innerHTML = `
    <div class="sra-pill-body">
      <span class="sra-pill-icon">${ICONS.check}</span>
      <span class="sra-pill-text">Surgical Edit Applied</span>
      <button class="sra-pill-undo-btn" id="sra-pill-undo">
        <span>${ICONS.undo}</span>
        <span>Undo</span>
      </button>
      <button class="sra-pill-close" id="sra-pill-dismiss">${ICONS.close}</button>
    </div>
  `;

  pill.querySelector('#sra-pill-undo').addEventListener('click', () => {
    rollbackPatch(patchRecord);
    pill.remove();
  });

  pill.querySelector('#sra-pill-dismiss').addEventListener('click', () => {
    pill.remove();
  });

  shadow.appendChild(pill);

  setTimeout(() => {
    if (pill.parentNode === shadow) {
      pill.style.opacity = '0';
      pill.style.transform = 'translateY(12px)';
      setTimeout(() => pill.remove(), 300);
    }
  }, 10000);
}

function rollbackPatch(patchRecord) {
  try {
    isRehydrating = true;
    replaceMatchingTextInAllContainers(patchRecord.replacedText, patchRecord.originalText);
    removePatchRecord(patchRecord.id);
    showSuccess('Restored original text successfully');
  } catch (err) {
    showError('Undo failed: ' + err.message);
  } finally {
    setTimeout(() => { isRehydrating = false; }, 300);
  }
}

// === WORD-LEVEL DIFF ALGORITHM ===
function computeWordDiffHtml(originalStr, newStr) {
  const origWords = originalStr.split(/(\s+|[.,!?;:()]+)/).filter(Boolean);
  const newWords = newStr.split(/(\s+|[.,!?;:()]+)/).filter(Boolean);

  const m = origWords.length;
  const n = newWords.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (origWords[i - 1] === newWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = m;
  let j = n;
  const result = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origWords[i - 1] === newWords[j - 1]) {
      result.unshift({ type: 'same', text: origWords[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'ins', text: newWords[j - 1] });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      result.unshift({ type: 'del', text: origWords[i - 1] });
      i--;
    }
  }

  return result
    .map(item => {
      const esc = escapeHtml(item.text);
      if (item.type === 'del') {
        return `<del class="sra-diff-del">${esc}</del>`;
      } else if (item.type === 'ins') {
        return `<ins class="sra-diff-ins">${esc}</ins>`;
      }
      return esc;
    })
    .join('');
}

// === SHADOW DOM WITH CLASSIC WHITE & WARM BROWN THEME ===
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
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Playfair Display', 'Georgia', 'Baskerville', 'Cambria', 'Times New Roman', serif;
        -webkit-font-smoothing: antialiased;
      }

      /* === CLASSIC TRIGGER BUTTON === */
      #sra-btn {
        position: fixed;
        z-index: 2147483647 !important;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 6px 14px;
        background: #2a1b12;
        color: #fdfbf7;
        border: 1px solid #8c5e3c;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.8px;
        cursor: pointer;
        box-shadow: 0 4px 18px rgba(42, 27, 18, 0.32), 0 0 0 1px rgba(224, 207, 186, 0.2);
        white-space: nowrap;
        transition: all 0.2s ease;
        animation: sraPopIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      #sra-btn:hover {
        background: #412a1c;
        border-color: #b07d53;
        transform: translateY(-1px) scale(1.02);
        box-shadow: 0 6px 22px rgba(42, 27, 18, 0.45);
      }
      .sra-icon {
        display: flex;
        align-items: center;
        color: #d4a373;
      }

      /* === PROMPT MENU MODAL (WHITE & WARM BROWN THEME) === */
      #sra-menu {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2147483647 !important;
        width: 370px;
        max-width: 90vw;
        background: #fdfbf7;
        border: 1px solid #dfd3c3;
        border-radius: 14px;
        box-shadow: 0 20px 50px rgba(50, 34, 24, 0.22), 0 0 0 1px rgba(223, 211, 195, 0.6);
        padding: 20px;
        color: #2b1d14;
        animation: sraScaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .sra-menu-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
      }
      .sra-brand {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .sra-brand-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        background: linear-gradient(135deg, #7c4d28, #4a2810);
        border-radius: 7px;
        color: #fbf7f0;
        box-shadow: 0 2px 8px rgba(74, 40, 16, 0.25);
      }
      .sra-brand-title {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.2px;
        color: #2b1d14;
      }
      .sra-header-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .sra-badge {
        font-size: 10px;
        font-weight: 600;
        background: #f3e9db;
        color: #7c4d28;
        padding: 2px 7px;
        border-radius: 4px;
        border: 1px solid #dfd3c3;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .sra-close-btn {
        background: none;
        border: none;
        color: #8c7362;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.15s ease;
      }
      .sra-close-btn:hover {
        background: #ede3d4;
        color: #2b1d14;
      }

      .sra-selected-preview {
        background: #f8f4ec;
        border: 1px solid #e5d8c5;
        border-left: 3px solid #8c5e3c;
        border-radius: 7px;
        padding: 10px 12px;
        margin-bottom: 14px;
      }
      .sra-preview-label {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        color: #8c6a50;
        letter-spacing: 0.8px;
        margin-bottom: 4px;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .sra-preview-text {
        font-size: 12.5px;
        color: #4a3629;
        line-height: 1.45;
        font-style: italic;
      }

      .sra-section-title {
        font-size: 10px;
        font-weight: 700;
        color: #8c7362;
        letter-spacing: 0.8px;
        margin-bottom: 8px;
        margin-top: 10px;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .sra-chips-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 7px;
        margin-bottom: 8px;
      }
      .sra-chip {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 11px;
        background: #ffffff;
        border: 1px solid #ded2bf;
        border-radius: 7px;
        color: #36271e;
        font-size: 12.5px;
        font-weight: 600;
        cursor: pointer;
        text-align: left;
        transition: all 0.18s ease;
        box-shadow: 0 1px 3px rgba(0,0,0,0.03);
      }
      .sra-chip:hover {
        background: #f5ece0;
        border-color: #8c5e3c;
        color: #1a0f0a;
        transform: translateY(-1px);
        box-shadow: 0 3px 8px rgba(74, 40, 16, 0.1);
      }
      .sra-chip-icon {
        display: flex;
        align-items: center;
        color: #7c4d28;
      }

      .sra-divider {
        height: 1px;
        background: #e8ded0;
        margin: 12px 0;
      }

      .sra-custom-box {
        display: flex;
        gap: 6px;
        background: #ffffff;
        border: 1px solid #d5c5ad;
        border-radius: 8px;
        padding: 4px 6px 4px 10px;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.04);
      }
      .sra-custom-box input {
        flex: 1;
        background: none;
        border: none;
        outline: none;
        color: #2b1d14;
        font-size: 12.5px;
      }
      .sra-custom-box input::placeholder {
        color: #9c8a7b;
        font-style: italic;
      }
      .sra-custom-box button {
        background: #7c4d28;
        color: #ffffff;
        border: none;
        border-radius: 6px;
        padding: 6px 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: background 0.15s;
      }
      .sra-custom-box button:hover {
        background: #5a3418;
      }

      /* === DIFF PREVIEW MODAL (WARM EDITORIAL PARCHMENT) === */
      #sra-diff-modal {
        position: fixed;
        inset: 0;
        background: rgba(35, 23, 15, 0.6);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 2147483647 !important;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: sraFadeIn 0.2s ease;
      }
      .sra-diff-container {
        width: 550px;
        max-width: 92vw;
        max-height: 85vh;
        background: #fdfbf7;
        border: 1px solid #dfd3c3;
        border-radius: 14px;
        box-shadow: 0 25px 60px rgba(40, 25, 16, 0.35);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        color: #2b1d14;
      }
      .sra-diff-header {
        padding: 16px 20px;
        border-bottom: 1px solid #e8ded0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #faf6ef;
      }
      .sra-view-toggle {
        display: flex;
        background: #eee4d5;
        border-radius: 6px;
        padding: 2px;
        border: 1px solid #ded2bf;
      }
      .sra-toggle-btn {
        background: none;
        border: none;
        color: #7a6353;
        padding: 5px 11px;
        font-size: 11.5px;
        font-weight: 600;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.15s;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .sra-toggle-btn.active {
        background: #7c4d28;
        color: white;
      }
      .sra-diff-body {
        padding: 22px;
        overflow-y: auto;
        font-size: 14.5px;
        line-height: 1.7;
        color: #2e1f15;
        background: #fdfbf7;
        min-height: 120px;
        max-height: 380px;
      }
      .sra-diff-content {
        white-space: pre-wrap;
        word-break: break-word;
      }
      .sra-hidden {
        display: none !important;
      }
      .sra-diff-del {
        background: #fde8e8;
        color: #b91c1c;
        text-decoration: line-through;
        padding: 2px 4px;
        border-radius: 3px;
        margin: 0 1px;
      }
      .sra-diff-ins {
        background: #eaf5eb;
        color: #15803d;
        text-decoration: none;
        font-weight: 600;
        padding: 2px 4px;
        border-radius: 3px;
        margin: 0 1px;
      }
      .sra-diff-legend {
        padding: 10px 20px;
        background: #f8f4ec;
        border-top: 1px solid #e8ded0;
        display: flex;
        gap: 16px;
        font-size: 11.5px;
        color: #7a6353;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .sra-legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .sra-legend-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .sra-legend-dot.del { background: #b91c1c; }
      .sra-legend-dot.ins { background: #15803d; }

      .sra-diff-footer {
        padding: 14px 20px;
        border-top: 1px solid #e8ded0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        background: #faf6ef;
      }
      .sra-btn-secondary {
        background: #ffffff;
        color: #6b5344;
        border: 1px solid #ded2bf;
        border-radius: 7px;
        padding: 8px 16px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .sra-btn-secondary:hover {
        background: #f3e9db;
        color: #2b1d14;
      }
      .sra-btn-primary {
        background: linear-gradient(135deg, #7c4d28, #5a3418);
        color: white;
        border: none;
        border-radius: 7px;
        padding: 8px 18px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 3px 12px rgba(74, 40, 16, 0.3);
        transition: all 0.15s;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .sra-btn-primary:hover {
        background: linear-gradient(135deg, #8f5a30, #6d3e1d);
        transform: translateY(-1px);
      }

      /* === UNDO FLOATING PILL === */
      #sra-undo-pill {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 2147483647 !important;
        background: #2a1b12;
        border: 1px solid #8c5e3c;
        border-radius: 30px;
        box-shadow: 0 10px 30px rgba(42, 27, 18, 0.35);
        padding: 6px 12px 6px 14px;
        display: flex;
        align-items: center;
        animation: sraSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        transition: all 0.25s ease;
      }
      .sra-pill-body {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .sra-pill-icon {
        color: #4ade80;
        display: flex;
        align-items: center;
      }
      .sra-pill-text {
        font-size: 12px;
        font-weight: 600;
        color: #fdfbf7;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .sra-pill-undo-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        background: rgba(212, 163, 115, 0.2);
        border: 1px solid #d4a373;
        border-radius: 20px;
        color: #fdfbf7;
        padding: 4px 10px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .sra-pill-undo-btn:hover {
        background: #7c4d28;
        color: white;
      }
      .sra-pill-close {
        background: none;
        border: none;
        color: #a89485;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 2px;
      }
      .sra-pill-close:hover { color: #ffffff; }

      /* === ELEGANT WARM LOADING SPINNER ("Loadinggggg...") === */
      #sra-loader {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2147483647 !important;
        background: #fdfbf7;
        border: 1px solid #dfd3c3;
        padding: 26px 36px;
        border-radius: 14px;
        box-shadow: 0 18px 45px rgba(50, 34, 24, 0.25);
        text-align: center;
        color: #2b1d14;
        animation: sraFadeIn 0.2s ease;
      }
      .sra-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid #ebdcc8;
        border-top: 3px solid #7c4d28;
        border-radius: 50%;
        margin: 0 auto 14px;
        animation: sraSpin 0.8s linear infinite;
      }
      .sra-loader-title {
        font-size: 14px;
        font-weight: 600;
        font-style: italic;
        color: #4a2810;
        letter-spacing: 0.5px;
      }

      /* === ANIMATIONS === */
      @keyframes sraSpin { to { transform: rotate(360deg); } }
      @keyframes sraFadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes sraPopIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      @keyframes sraScaleIn { from { opacity: 0; transform: translate(-50%, -47%) scale(0.95); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      @keyframes sraSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    `;
    shadowRoot.appendChild(style);
  } else {
    shadowRoot = host.shadowRoot;
  }

  return shadowRoot;
}

function showLoading(msg = 'Loadinggggg...') {
  const shadow = getShadowRoot();
  hideLoading();
  const loader = document.createElement('div');
  loader.id = 'sra-loader';
  loader.innerHTML = `
    <div class="sra-spinner"></div>
    <div class="sra-loader-title">${escapeHtml(msg)}</div>
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
    background: #fde8e8; color: #991b1b; padding: 14px 18px; border-radius: 8px;
    border: 1px solid #f87171; max-width: 420px; font-size: 12.5px; font-weight: 500;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 8px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  `;
  box.innerHTML = `<span style="color:#b91c1c">${ICONS.close}</span><span>${escapeHtml(msg)}</span>`;
  shadow.appendChild(box);
  setTimeout(() => box.remove(), 5000);
}

function showSuccess(msg) {
  const shadow = getShadowRoot();
  const box = document.createElement('div');
  box.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 2147483647 !important;
    background: #eaf5eb; color: #166534; padding: 14px 18px; border-radius: 8px;
    border: 1px solid #86efac; max-width: 420px; font-size: 12.5px; font-weight: 500;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 8px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  `;
  box.innerHTML = `<span style="color:#15803d">${ICONS.check}</span><span>${escapeHtml(msg)}</span>`;
  shadow.appendChild(box);
  setTimeout(() => box.remove(), 3500);
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function truncate(str, maxLen = 100) {
  if (!str) return '';
  return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
}
