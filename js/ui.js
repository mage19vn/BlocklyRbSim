/**
 * ui.js — RbSim Code Generator
 * Coder: Mage__
 *
 * Main wiring:
 * - Blockly workspace initialization
 * - Monaco Editor setup (inline via CDN)
 * - Real-time code preview
 * - Duplicate task warning
 * - Header button actions
 * - Vietnamese Blockly messages
 */

'use strict';

/* ============================================================
   VIETNAMESE BLOCKLY MESSAGES
   ============================================================ */
function setupVietnameseMsgs() {
  // Control structures
  Blockly.Msg['CONTROLS_IF_MSG_IF']     = 'nếu';
  Blockly.Msg['CONTROLS_IF_MSG_ELSEIF'] = 'nếu không thì nếu';
  Blockly.Msg['CONTROLS_IF_MSG_ELSE']   = 'nếu không';
  Blockly.Msg['CONTROLS_IF_MSG_THEN']   = 'thực hiện';
  Blockly.Msg['CONTROLS_IF_TOOLTIP_1']  = 'Nếu điều kiện đúng, thực hiện lệnh.';

  // Loops
  Blockly.Msg['CONTROLS_REPEAT_TITLE']               = 'lặp %1 lần';
  Blockly.Msg['CONTROLS_REPEAT_INPUT_DO']            = 'thực hiện';
  Blockly.Msg['CONTROLS_WHILEUNTIL_OPERATOR_WHILE']  = 'lặp trong khi';
  Blockly.Msg['CONTROLS_WHILEUNTIL_OPERATOR_UNTIL']  = 'lặp cho đến khi';
  Blockly.Msg['CONTROLS_FOR_TITLE']                  = 'cho %1 từ %2 đến %3 bước %4';
  Blockly.Msg['CONTROLS_FOREACH_TITLE']              = 'với mỗi %1 trong %2';
  Blockly.Msg['CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK']    = 'ngắt vòng lặp';
  Blockly.Msg['CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE'] = 'bỏ qua lượt này';

  // Logic
  Blockly.Msg['LOGIC_BOOLEAN_TRUE']   = 'đúng';
  Blockly.Msg['LOGIC_BOOLEAN_FALSE']  = 'sai';
  Blockly.Msg['LOGIC_OPERATION_AND']  = 'và';
  Blockly.Msg['LOGIC_OPERATION_OR']   = 'hoặc';
  Blockly.Msg['LOGIC_NEGATE_TITLE']   = 'không phải %1';
  Blockly.Msg['LOGIC_NULL']           = 'rỗng';

  // Math
  Blockly.Msg['MATH_RANDOM_INT_TITLE']      = 'số ngẫu nhiên từ %1 đến %2';
  Blockly.Msg['MATH_ROUND_OPERATOR_ROUND']  = 'làm tròn';

  // Variables
  Blockly.Msg['VARIABLES_DEFAULT_NAME'] = 'bien';
  Blockly.Msg['VARIABLES_SET']          = 'đặt %1 bằng %2';
  Blockly.Msg['VARIABLES_GET_TOOLTIP']  = 'Giá trị của biến này.';
  Blockly.Msg['MATH_CHANGE_TITLE']      = 'tăng %1 thêm %2';
  Blockly.Msg['NEW_VARIABLE']           = 'Tạo biến mới...';
  Blockly.Msg['RENAME_VARIABLE']        = 'Đổi tên biến...';
  Blockly.Msg['DELETE_VARIABLE']        = 'Xóa biến %1';
  Blockly.Msg['DELETE_ALL_BLOCKS']      = 'Xóa tất cả %1 khối?';
  Blockly.Msg['CLEAN_UP']               = 'Sắp xếp lại các khối';
  Blockly.Msg['COLLAPSE_BLOCK']         = 'Thu gọn khối';
  Blockly.Msg['EXPAND_BLOCK']           = 'Mở rộng khối';
  Blockly.Msg['DISABLE_BLOCK']          = 'Vô hiệu hóa khối';
  Blockly.Msg['ENABLE_BLOCK']           = 'Kích hoạt khối';
  Blockly.Msg['UNDO']                   = 'Hoàn tác';
  Blockly.Msg['REDO']                   = 'Làm lại';

  // Procedures
  Blockly.Msg['PROCEDURES_DEFNORETURN_TITLE']    = 'hàm';
  Blockly.Msg['PROCEDURES_DEFNORETURN_DO']       = 'thực hiện';
  Blockly.Msg['PROCEDURES_DEFRETURN_TITLE']      = 'hàm';
  Blockly.Msg['PROCEDURES_DEFRETURN_DO']         = 'thực hiện';
  Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']     = 'trả về';
  Blockly.Msg['PROCEDURES_CALLNORETURN_HELPURL'] = '';
  Blockly.Msg['PROCEDURES_CALLRETURN_HELPURL']   = '';
}

/* ============================================================
   BLOCKLY THEME
   ============================================================ */
function createBlocklyTheme() {
  return Blockly.Theme.defineTheme('rbsim_dark', {
    base: Blockly.Themes.Classic,
    componentStyles: {
      workspaceBackgroundColour:  '#080d14',
      toolboxBackgroundColour:    '#111b28',
      toolboxForegroundColour:    '#e2e8f0',
      flyoutBackgroundColour:     '#0d1520',
      flyoutForegroundColour:     '#94a3b8',
      flyoutOpacity:              0.97,
      scrollbarColour:            '#1e2d42',
      insertionMarkerColour:      '#00d4ff',
      insertionMarkerOpacity:     0.4,
      cursorColour:               '#00d4ff',
    },
    fontStyle: {
      family: '"Inter", "Segoe UI", system-ui, sans-serif',
      weight: '600',
      size:   12
    },
    startHats: true
  });
}

/* ============================================================
   STATE
   ============================================================ */
let workspace     = null;
let monacoEditor  = null;
let pythonGen     = null;
let _autoSaveTimer = null;
let _isResizing   = false;

/* ============================================================
   CUSTOM BLOCKLY DIALOGS
   ============================================================ */
function setupCustomDialogs() {
  const overlay = document.getElementById('custom-modal-overlay');
  function showModal(opts) {
    const titleEl = document.getElementById('custom-modal-title');
    const msgEl = document.getElementById('custom-modal-message');
    const inputEl = document.getElementById('custom-modal-input');
    
    titleEl.textContent = opts.title || 'Thông báo';
    msgEl.textContent = opts.message || '';
    
    if (opts.showInput) {
      inputEl.style.display = 'block';
      inputEl.value = opts.defaultValue || '';
    } else {
      inputEl.style.display = 'none';
    }
    
    const btnOk = document.getElementById('custom-modal-btn-ok');
    const btnCancel = document.getElementById('custom-modal-btn-cancel');
    const btnClose = document.getElementById('custom-modal-close');
    
    // Replace nodes to clear event listeners
    const newBtnOk = btnOk.cloneNode(true);
    const newBtnCancel = btnCancel.cloneNode(true);
    const newBtnClose = btnClose.cloneNode(true);
    const newInput = inputEl.cloneNode(true);
    
    btnOk.replaceWith(newBtnOk);
    btnCancel.replaceWith(newBtnCancel);
    btnClose.replaceWith(newBtnClose);
    inputEl.replaceWith(newInput);
    
    if (opts.showCancel) {
      newBtnCancel.style.display = 'inline-flex';
    } else {
      newBtnCancel.style.display = 'none';
    }
    
    const closeDialog = (val) => {
      overlay.classList.add('hidden');
      if (opts.callback) opts.callback(val);
    };

    newBtnOk.addEventListener('click', () => closeDialog(opts.showInput ? newInput.value : true));
    newBtnCancel.addEventListener('click', () => closeDialog(opts.showInput ? null : false));
    newBtnClose.addEventListener('click', () => closeDialog(opts.showInput ? null : false));
    
    newInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') closeDialog(newInput.value);
      if (e.key === 'Escape') closeDialog(null);
    });

    overlay.classList.remove('hidden');
    
    if (opts.showInput) {
      setTimeout(() => {
        newInput.focus();
        newInput.select();
      }, 50);
    } else {
      newBtnOk.focus();
    }
  }

  if (Blockly.dialog) {
    Blockly.dialog.setAlert(function(message, callback) {
      showModal({ title: 'Thông báo', message: message, showInput: false, showCancel: false, callback: callback });
    });
    Blockly.dialog.setConfirm(function(message, callback) {
      showModal({ title: 'Xác nhận', message: message, showInput: false, showCancel: true, callback: callback });
    });
    Blockly.dialog.setPrompt(function(message, defaultValue, callback) {
      showModal({ title: 'Nhập liệu', message: message, showInput: true, showCancel: true, defaultValue: defaultValue, callback: callback });
    });
  }
}

/* ============================================================
   INIT — called from index.html after all scripts load
   ============================================================ */
function initApp() {
  setupVietnameseMsgs();
  setupCustomDialogs();

  // 1. Init Blockly
  const theme = createBlocklyTheme();
  workspace = Blockly.inject('blocklyDiv', {
    toolbox: window.RbSimToolbox,
    theme:   theme,
    grid: {
      spacing:  28,
      length:   2,
      colour:   'rgba(0,212,255,0.06)',
      snap:     true
    },
    zoom: {
      startScale: 0.9,
      controls:   true,
      wheel:      true,
      pinch:      true,
      maxScale:   3,
      minScale:   0.3
    },
    move: {
      scrollbars: { horizontal: true, vertical: true },
      drag: true,
      wheel: true
    },
    trashcan:  true,
    renderer:  'thrasos'
  });

  // 2. Register generators
  // Detect which API version is available
  if (typeof Blockly.Python !== 'undefined') {
    pythonGen = Blockly.Python;
  } else if (typeof Blockly.generator !== 'undefined') {
    pythonGen = Blockly.generator;
  } else {
    // Fallback: create a generator
    pythonGen = new Blockly.Generator('Python');
  }
  // Bắt buộc dùng 4 dấu cách cho Python
  pythonGen.INDENT = '    ';
  window.RbSimGenerators.registerGenerators(pythonGen);

  // 3. Load saved workspace
  const loaded = window.RbSimStorage.loadWorkspace(workspace);
  if (!loaded) {
    // Place a default task1 block to help new users
    _addDefaultTaskBlock();
  }

  // 4. Init Monaco Editor (async)
  _initMonaco();

  // 5. Workspace change listener
  workspace.addChangeListener(_onWorkspaceChange);

  // 6. Wire header buttons
  _wireButtons();

  // 7. Resize handle
  _initResizeHandle();

  // 8. Update status bar
  _updateStatusBar();
}

/* ============================================================
   DEFAULT TASK BLOCK
   ============================================================ */
function _addDefaultTaskBlock() {
  try {
    const block = workspace.newBlock('rbsim_task_init');
    block.setFieldValue('task1', 'TASK_ID');
    block.initSvg();
    block.render();
    block.moveBy(60, 60);
  } catch (e) {
    console.warn('[RbSim UI] Could not add default block:', e);
  }
}

/* ============================================================
   MONACO EDITOR INIT
   Monaco is loaded via require() after the loader CDN script.
   We fall back to a <textarea> if Monaco fails.
   ============================================================ */
function _initMonaco() {
  try {
    require.config({
      paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' }
    });

    require(['vs/editor/editor.main'], () => {
      // Define custom dark theme for Monaco
      monaco.editor.defineTheme('rbsim-dark', {
        base:    'vs-dark',
        inherit: true,
        rules: [
          { token: 'keyword',  foreground: '00d4ff', fontStyle: 'bold' },
          { token: 'string',   foreground: '22d3a6' },
          { token: 'comment',  foreground: '475569', fontStyle: 'italic' },
          { token: 'number',   foreground: 'fb923c' },
          { token: 'type',     foreground: 'a78bfa' },
          { token: 'function', foreground: 'e2e8f0' },
        ],
        colors: {
          'editor.background':              '#0d1520',
          'editor.foreground':              '#e2e8f0',
          'editorLineNumber.foreground':    '#334155',
          'editorLineNumber.activeForeground': '#94a3b8',
          'editor.lineHighlightBackground': '#111b28',
          'editor.selectionBackground':     '#1e2d42',
          'editorCursor.foreground':        '#00d4ff',
          'editorBracketMatch.background':  '#172234',
          'editorBracketMatch.border':      '#00d4ff44',
          'scrollbar.shadow':               '#00000000',
          'scrollbarSlider.background':     '#1e2d4280',
          'scrollbarSlider.hoverBackground':'#243450aa',
          'minimap.background':             '#080d14',
        }
      });

      monacoEditor = monaco.editor.create(
        document.getElementById('monacoDiv'), {
          value:          '# Bắt đầu bằng cách kéo khối vào workspace...\n',
          language:       'python',
          theme:          'rbsim-dark',
          readOnly:       true,
          fontSize:       13,
          fontFamily:     '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
          fontLigatures:  true,
          lineNumbers:    'on',
          minimap:        { enabled: true, maxColumn: 80 },
          scrollBeyondLastLine: false,
          automaticLayout:      true,
          wordWrap:       'off',
          padding:        { top: 12, bottom: 12 },
          renderLineHighlight: 'line',
          smoothScrolling:     true,
          cursorSmoothCaretAnimation: 'on',
          bracketPairColorization: { enabled: true },
          renderWhitespace: 'none',
          folding: true,
        }
      );

      // Trigger first code generation
      _refreshCodePreview();
    });
  } catch (e) {
    console.warn('[RbSim UI] Monaco init failed, using fallback textarea:', e);
    _initTextareaFallback();
  }
}

/* ============================================================
   TEXTAREA FALLBACK (if Monaco CDN fails)
   ============================================================ */
function _initTextareaFallback() {
  const div = document.getElementById('monacoDiv');
  div.innerHTML = '';
  const ta = document.createElement('textarea');
  ta.id = 'codeTextarea';
  ta.readOnly = true;
  ta.style.cssText = `
    width:100%; height:100%; background:#0d1520; color:#e2e8f0;
    font-family:'JetBrains Mono',monospace; font-size:13px;
    border:none; outline:none; padding:12px; resize:none;
    tab-size:4; line-height:1.6;
  `;
  div.appendChild(ta);
  monacoEditor = {
    // Mimic Monaco API
    setValue: (v) => { ta.value = v; },
    getValue: () => ta.value,
  };
  _refreshCodePreview();
}

/* ============================================================
   WORKSPACE CHANGE LISTENER
   ============================================================ */
function _onWorkspaceChange(event) {
  // Ignore pure UI events (scrolling, zooming)
  const uiTypes = [
    Blockly.Events.VIEWPORT_CHANGE,
    Blockly.Events.SELECTED,
    Blockly.Events.CLICK,
    'drag'
  ];
  if (uiTypes.includes(event.type)) return;

  // Debounce: wait 100ms after last change before refreshing
  clearTimeout(_autoSaveTimer);
  _autoSaveTimer = setTimeout(() => {
    _refreshCodePreview();
    window.RbSimStorage.saveWorkspace(workspace);
    _updateStatusBar();
    _checkDuplicateTasks();
  }, 100);
}

/* ============================================================
   CODE PREVIEW REFRESH
   ============================================================ */
function _refreshCodePreview() {
  if (!workspace || !pythonGen) return;

  let code = '';
  try {
    code = window.RbSimTemplates.assembleFinalCode(workspace, pythonGen);
  } catch (e) {
    console.error('[RbSim UI] Code generation error:', e);
    code = `# Lỗi sinh code:\n# ${e.message}\n`;
  }

  // Update Monaco / textarea
  if (monacoEditor && monacoEditor.setValue) {
    monacoEditor.setValue(code);
  }

  // Update stats
  const stats = window.RbSimTemplates.getCodeStats(code);
  const statsEl = document.getElementById('preview-lines');
  if (statsEl) statsEl.textContent = `${stats.lines} dòng`;

  // Update mode badge
  _updateModeBadge();
}

/* ============================================================
   MODE BADGE (Single / Multi Task)
   ============================================================ */
function _updateModeBadge() {
  if (!workspace) return;
  const taskBlocks = workspace.getTopBlocks(true)
    .filter(b => b.type === 'rbsim_task_init' && b.isEnabled());
  const count = taskBlocks.length;
  const modeEl = document.getElementById('mode-value');
  if (!modeEl) return;
  if (count <= 1) {
    modeEl.textContent = 'Single Task';
    modeEl.className   = 'mode-value';
  } else {
    modeEl.textContent = `Multi Task (${count})`;
    modeEl.className   = 'mode-value multi';
  }
}

/* ============================================================
   DUPLICATE TASK WARNING
   ============================================================ */
function _checkDuplicateTasks() {
  if (!workspace) return;
  const duplicates = window.RbSimTemplates.findDuplicateTasks(workspace);
  const banner = document.getElementById('duplicate-banner');
  if (!banner) return;

  if (duplicates.length > 0) {
    banner.classList.add('visible');
    banner.querySelector('.dup-ids').textContent =
      duplicates.map(id => id.replace('task', 'Task ')).join(', ');
  } else {
    banner.classList.remove('visible');
  }

  // Highlight duplicate blocks with warning icon
  workspace.getTopBlocks(true)
    .filter(b => b.type === 'rbsim_task_init')
    .forEach(b => {
      const taskId = b.getFieldValue('TASK_ID');
      if (duplicates.includes(taskId)) {
        b.setWarningText('⚠️ Task này bị trùng! Mỗi Task chỉ nên xuất hiện một lần.');
      } else {
        b.setWarningText(null);
      }
    });
}

/* ============================================================
   STATUS BAR UPDATE
   ============================================================ */
function _updateStatusBar() {
  if (!workspace) return;
  const allBlocks = workspace.getAllBlocks(false);
  const blockEl   = document.getElementById('status-blocks');
  if (blockEl) blockEl.textContent = `${allBlocks.length} blocks`;
}

/* ============================================================
   BUTTON WIRING
   ============================================================ */
function _wireButtons() {
  // Export Python
  document.getElementById('btn-export-py').addEventListener('click', () => {
    if (!monacoEditor) return;
    const code = monacoEditor.getValue();
    try {
      window.RbSimStorage.exportPythonFile(code);
      showToast('✅ Đã xuất file Python thành công!', 'success');
    } catch (e) {
      showToast('❌ Xuất file thất bại.', 'error');
    }
  });

  // Import Workspace
  document.getElementById('btn-import-ws').addEventListener('click', async () => {
    try {
      const ok = await window.RbSimStorage.importWorkspaceJSON(workspace);
      if (ok) {
        _refreshCodePreview();
        showToast('✅ Đã nhập Workspace thành công!', 'success');
      }
    } catch (e) {
      showToast('❌ File không hợp lệ hoặc bị lỗi.', 'error');
    }
  });

  // Export Workspace
  document.getElementById('btn-export-ws').addEventListener('click', () => {
    try {
      window.RbSimStorage.exportWorkspaceJSON(workspace);
      showToast('✅ Đã xuất Workspace JSON!', 'success');
    } catch (e) {
      showToast('❌ Xuất Workspace thất bại.', 'error');
    }
  });

  // Reset
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (!confirm('Xóa toàn bộ workspace? Hành động này không thể hoàn tác.')) return;
    window.RbSimStorage.clearWorkspace(workspace);
    _refreshCodePreview();
    _updateStatusBar();
    showToast('🗑️ Workspace đã được xóa.', 'warning');
  });

  // Copy Code
  document.getElementById('btn-copy').addEventListener('click', async () => {
    if (!monacoEditor) return;
    const code = monacoEditor.getValue();
    try {
      await navigator.clipboard.writeText(code);
      const btn = document.getElementById('btn-copy');
      btn.classList.add('copied');
      btn.title = 'Đã sao chép!';
      showToast('📋 Đã sao chép code!', 'success');
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.title = 'Sao chép code';
      }, 2000);
    } catch (e) {
      showToast('❌ Không thể sao chép.', 'error');
    }
  });

  // Download .py (from preview panel)
  document.getElementById('btn-download').addEventListener('click', () => {
    if (!monacoEditor) return;
    const code = monacoEditor.getValue();
    try {
      window.RbSimStorage.exportPythonFile(code);
      showToast('💾 Đã tải file .py!', 'success');
    } catch (e) {
      showToast('❌ Tải file thất bại.', 'error');
    }
  });
}

/* ============================================================
   RESIZE HANDLE (drag to resize preview panel)
   ============================================================ */
function _initResizeHandle() {
  const handle  = document.getElementById('resize-handle');
  const panel   = document.getElementById('preview-panel');
  if (!handle || !panel) return;

  let startX, startW;

  handle.addEventListener('mousedown', (e) => {
    _isResizing = true;
    startX = e.clientX;
    startW = panel.offsetWidth;
    handle.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!_isResizing) return;
    const delta = startX - e.clientX;
    const newW  = Math.max(260, Math.min(window.innerWidth * 0.55, startW + delta));
    panel.style.width = newW + 'px';
    // Trigger Monaco layout recalculation
    if (monacoEditor && monacoEditor.layout) monacoEditor.layout();
  });

  document.addEventListener('mouseup', () => {
    if (!_isResizing) return;
    _isResizing = false;
    handle.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });
}

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <span class="toast-msg">${message}</span>
  `;
  container.appendChild(toast);

  // Auto-remove after 3s
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

// Expose globally for inline onclick handlers
window.initApp   = initApp;
window.showToast = showToast;
