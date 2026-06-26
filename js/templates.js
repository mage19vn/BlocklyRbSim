/**
 * templates.js — RbSim Code Generator
 * Coder: Mage__
 *
 * Python template assembly.
 * - buildSingleTaskCode(taskBodyMap) → single task output
 * - buildMultiTaskCode(taskBodyMap)  → multi-thread output
 * - assembleFinalCode(workspace, pythonGenerator) → complete .py string
 */

'use strict';

/* ============================================================
   HELPER FUNCTIONS (mirror of template.py)
   These are always included in generated output.
   ============================================================ */
const HELPER_FUNCTIONS = `\
def wait(sec : int):
    rcu.SetWaitForTime(sec)

def stop():
    rcu.SetMoveStop()

def getDist(port : int) -> int:
    return rcu.GetUltrasound(port)

def getColor(port : int) -> int:
    return rcu.GetColor(port)

def light(port : int, color : int):
    color = color % 8
    rcu.Set3CLed(port, color if (color) else 8)

def reversalMotor(MotorLeft : int, MotorRight : int, reType : int):
    relist = ["", "left_reversal", "right_reversal", "all_reversal", "no_reversal"]
    ty = relist[reType]
    rcu.SetMoveInitialize(MotorLeft, MotorRight, ty)

def goto(speed : int, sec : float):
    if (speed > 0):
        rcu.SetMoveRunSecond("forward", speed, sec)
    else:
        rcu.SetMoveRunSecond("backward", abs(speed), sec)
    stop()

def turnleft(speed : int, sec : float):
    rcu.SetMoveRunSecond("turnleft", speed, sec)
    stop()

def turnright(speed : int, sec : float):
    rcu.SetMoveRunSecond("turnright", speed, sec)
    stop()

def rbMove(rbType : int, speed : int):
    rblist = ["", "forward", "backward", "turnleft", "turnright"]
    srbType = rblist[rbType]
    rcu.SetMoveRun(srbType, speed)

def lineinit(port : int, color : int):
    scolor = "white" if (color - 1) else "black"
    rcu.line_set_initialize(port, scolor, "wheeledchassis")

def linegoto(speed : int, sec : float):
    msec = int(sec * 1000)
    rcu.line_millisecond(speed, msec)
    stop()

def linelr(speed : int, still : int):
    still = 17 if still == 1 else 1 if still == 2 else 7
    rcu.line_intersection_stop(speed, still)

def turnline(speedL : int, speedR : int, led : int):
    rcu.line_turn_encounterline(speedL, speedR, led)
    stop()

def linego(speed : int):
    rcu.line_basis(speed)

def motSpeed(port : int, speed : int):
    rcu.SetMotor(port, speed)

def motAngle(port : int, speed : int, addAngle : int):
    rcu.SetMotorServo(port, speed, addAngle)

def servo1(port : int, angle : int):
    rcu.SetServo(port, angle)

def servo2(port : int, angle : int):
    rcu.SetSeeringEngine(port, angle)

def servo1ForTime(port : int, angle : int, sec : float):
    mSec = int(sec * 1000)
    rcu.SetServoTime(port, angle, mSec)

def servo2ForTime(port : int, angle : int, sec : float):
    mSec = int(sec * 1000)
    rcu.SetSeeringEngineTime(port, angle, mSec)
`;

/* ============================================================
   SINGLE TASK TEMPLATE
   (mirrors template.py structure)
   ============================================================ */
function buildSingleTaskCode(taskBodyMap, customFunctionsCode = '') {
  const taskId = Object.keys(taskBodyMap)[0] || 'task1';
  let body = taskBodyMap[taskId] || '    pass\n';
  if (body.trim() === '') body = '    pass\n';

  return [
    'import rcu',
    '',
    HELPER_FUNCTIONS,
    customFunctionsCode ? customFunctionsCode + '\n' : '',
    `def ${taskId}():`,
    body,
    `${taskId}()`,
    ''
  ].join('\n');
}

/* ============================================================
   MULTI TASK TEMPLATE
   (mirrors template_multitask.py structure)
   ============================================================ */
function buildMultiTaskCode(taskBodyMap, customFunctionsCode = '') {
  const taskIds = Object.keys(taskBodyMap).sort();

  const taskDefs = taskIds.map(id => {
    let body = taskBodyMap[id] || '    pass\n';
    if (body.trim() === '') body = '    pass\n';
    return `def ${id}():\n${body}`;
  }).join('\n');

  const threadLines = taskIds.map(id =>
    `_thread.start_new_thread(${id}, ())`
  ).join('\n');

  return [
    'import rcu',
    'import _thread',
    '',
    HELPER_FUNCTIONS,
    customFunctionsCode ? customFunctionsCode + '\n' : '',
    taskDefs,
    threadLines,
    '',
    'while 1:',
    '    pass',
    ''
  ].join('\n');
}

/* ============================================================
   MAIN ASSEMBLER
   Reads the workspace, groups code by task, picks template.
   ============================================================ */
function assembleFinalCode(workspace, pythonGenerator) {
  if (!workspace || !pythonGenerator) {
    return '# Workspace chưa sẵn sàng\n';
  }

  // Khởi tạo generator để xóa state cũ (ví dụ definitions_)
  pythonGenerator.init(workspace);

  // Lấy tất cả block ngoài cùng
  const topBlocks = workspace.getTopBlocks(true);

  // Lọc các block Task
  const taskBlocks = [];
  let looseCode = '';

  for (const block of topBlocks) {
    if (block.type === 'rbsim_task_init') {
      if (block.isEnabled()) taskBlocks.push(block);
    } else {
      // Các block khác (bao gồm cả block hàm/procedures)
      if (block.isEnabled()) {
        try {
          const code = pythonGenerator.blockToCode(block);
          if (typeof code === 'string') looseCode += code;
        } catch(e) {
          console.warn('Generator error for block', block.type, e);
        }
      }
    }
  }

  // Lấy các hàm tự định nghĩa (Blockly tự động đưa vào pythonGenerator.definitions_)
  const defs = [];
  for (const name in pythonGenerator.definitions_) {
    defs.push(pythonGenerator.definitions_[name]);
  }
  const customFunctionsCode = defs.join('\n\n');

  // Build taskBodyMap: { taskId: pythonCodeString }
  const taskBodyMap = {};

  if (taskBlocks.length === 0) {
    // Nếu không có block Task nào, nhưng có looseCode, gộp thành task1
    if (!looseCode.trim() && !customFunctionsCode.trim()) {
      return '# Kéo khối "Khởi tạo Task" vào workspace để bắt đầu\n';
    }
    taskBodyMap['task1'] = looseCode || '    pass\n';
  } else {
    for (const taskBlock of taskBlocks) {
      const taskId = taskBlock.getFieldValue('TASK_ID') || 'task1';
      let body = '';
      try {
        body = pythonGenerator.statementToCode(taskBlock, 'BODY');
      } catch (e) {
        console.warn('Generator error for task block', taskId, e);
      }
      taskBodyMap[taskId] = body || '    pass\n';
    }
  }

  // Chọn template dựa trên số task
  const taskCount = Object.keys(taskBodyMap).length;
  if (taskCount <= 1) {
    return buildSingleTaskCode(taskBodyMap, customFunctionsCode);
  } else {
    return buildMultiTaskCode(taskBodyMap, customFunctionsCode);
  }
}

/* ============================================================
   DUPLICATE TASK DETECTION
   Returns array of task IDs that appear more than once.
   ============================================================ */
function findDuplicateTasks(workspace) {
  if (!workspace) return [];
  const counts = {};
  workspace.getTopBlocks(true)
    .filter(b => b.type === 'rbsim_task_init' && b.isEnabled())
    .forEach(b => {
      const id = b.getFieldValue('TASK_ID');
      counts[id] = (counts[id] || 0) + 1;
    });
  return Object.entries(counts)
    .filter(([, count]) => count > 1)
    .map(([id]) => id);
}

/* ============================================================
   COUNT STATS
   ============================================================ */
function getCodeStats(code) {
  const lines = code.split('\n').filter(l => l.trim() !== '');
  const chars = code.length;
  return { lines: lines.length, chars };
}

// Export
window.RbSimTemplates = {
  assembleFinalCode,
  buildSingleTaskCode,
  buildMultiTaskCode,
  findDuplicateTasks,
  getCodeStats
};
