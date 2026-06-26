/**
 * storage.js — RbSim Code Generator
 * Coder: Mage__
 *
 * Workspace persistence:
 * - Auto-save to LocalStorage
 * - Export/Import JSON workspace
 * - Export .py file
 */

'use strict';

const STORAGE_KEY = 'rbsim_workspace_v1';

/* ============================================================
   AUTO-SAVE TO LOCALSTORAGE
   ============================================================ */
function saveWorkspace(workspace) {
  if (!workspace) return;
  try {
    const state = Blockly.serialization.workspaces.save(workspace);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('[RbSim Storage] Auto-save failed:', e);
  }
}

/* ============================================================
   LOAD FROM LOCALSTORAGE
   Returns true if data was loaded, false otherwise.
   ============================================================ */
function loadWorkspace(workspace) {
  if (!workspace) return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;

    const state = JSON.parse(raw);
    workspace.clear();
    Blockly.serialization.workspaces.load(state, workspace);
    return true;
  } catch (e) {
    console.warn('[RbSim Storage] Load failed:', e);
    return false;
  }
}

/* ============================================================
   CLEAR LOCALSTORAGE (for Reset)
   ============================================================ */
function clearWorkspace(workspace) {
  if (!workspace) return;
  try {
    workspace.clear();
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('[RbSim Storage] Clear failed:', e);
  }
}

/* ============================================================
   EXPORT WORKSPACE AS JSON FILE
   ============================================================ */
function exportWorkspaceJSON(workspace) {
  if (!workspace) return;
  try {
    const state = Blockly.serialization.workspaces.save(workspace);
    const json   = JSON.stringify(state, null, 2);
    const blob   = new Blob([json], { type: 'application/json' });
    const url    = URL.createObjectURL(blob);
    const a      = document.createElement('a');
    a.href       = url;
    a.download   = `rbsim_workspace_${_dateStamp()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (e) {
    console.error('[RbSim Storage] Export JSON failed:', e);
    throw e;
  }
}

/* ============================================================
   IMPORT WORKSPACE FROM JSON FILE
   Returns Promise<boolean>
   ============================================================ */
function importWorkspaceJSON(workspace) {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type  = 'file';
    input.accept = '.json,application/json';

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) { resolve(false); return; }

      try {
        const text  = await file.text();
        const state = JSON.parse(text);

        workspace.clear();
        Blockly.serialization.workspaces.load(state, workspace);

        // Also save to localStorage so it persists on refresh
        saveWorkspace(workspace);
        resolve(true);
      } catch (err) {
        console.error('[RbSim Storage] Import JSON failed:', err);
        reject(err);
      }
    };

    input.oncancel = () => resolve(false);
    input.click();
  });
}

/* ============================================================
   EXPORT PYTHON FILE
   ============================================================ */
function exportPythonFile(code, filename) {
  try {
    const name = filename || `rbsim_code_${_dateStamp()}.py`;
    const blob  = new Blob([code], { type: 'text/x-python' });
    const url   = URL.createObjectURL(blob);
    const a     = document.createElement('a');
    a.href      = url;
    a.download  = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (e) {
    console.error('[RbSim Storage] Export Python failed:', e);
    throw e;
  }
}

/* ============================================================
   HELPER: date stamp for filenames
   ============================================================ */
function _dateStamp() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
}

// Export
window.RbSimStorage = {
  saveWorkspace,
  loadWorkspace,
  clearWorkspace,
  exportWorkspaceJSON,
  importWorkspaceJSON,
  exportPythonFile
};
