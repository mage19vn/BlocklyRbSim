/**
 * generators.js — RbSim Code Generator
 * Coder: Mage__
 *
 * Python code generators for every custom Blockly block.
 * Registered on the global `pythonGenerator` object.
 * Standard Blockly blocks (if/loop/math/variables) use built-in generators.
 */

'use strict';

// We access the global Python generator (set up in ui.js after Blockly loads)
// All generators are registered in `registerGenerators()`, called from ui.js.

function registerGenerators(pythonGenerator) {

  /* ----------------------------------------------------------
     Helper: get value code (number or expression)
     ---------------------------------------------------------- */
  const val = (block, name, def = '0') => {
    const code = pythonGenerator.valueToCode(block, name,
                   pythonGenerator.ORDER_NONE);
    return code || def;
  };

  /* ----------------------------------------------------------
     GROUP 1 — TASK INIT
     ---------------------------------------------------------- */
  pythonGenerator.forBlock['rbsim_task_init'] = function(block) {
    const taskId = block.getFieldValue('TASK_ID') || 'task1';
    const body   = pythonGenerator.statementToCode(block, 'BODY') || '    pass\n';
    // Body is already indented by Blockly (4 spaces per level)
    return `def ${taskId}():\n${body}\n`;
  };

  /* ----------------------------------------------------------
     GROUP 2 — ROBOT CONTROL
     ---------------------------------------------------------- */
  pythonGenerator.forBlock['rbsim_wait'] = function(block) {
    const sec = val(block, 'SEC', '1');
    return `wait(${sec})\n`;
  };

  pythonGenerator.forBlock['rbsim_stop'] = function(block) {
    return `stop()\n`;
  };

  pythonGenerator.forBlock['rbsim_goto'] = function(block) {
    const speed = val(block, 'SPEED', '50');
    const sec   = val(block, 'SEC', '1.0');
    return `goto(${speed}, ${sec})\n`;
  };

  pythonGenerator.forBlock['rbsim_turnleft'] = function(block) {
    const speed = val(block, 'SPEED', '50');
    const sec   = val(block, 'SEC', '1.0');
    return `turnleft(${speed}, ${sec})\n`;
  };

  pythonGenerator.forBlock['rbsim_turnright'] = function(block) {
    const speed = val(block, 'SPEED', '50');
    const sec   = val(block, 'SEC', '1.0');
    return `turnright(${speed}, ${sec})\n`;
  };

  pythonGenerator.forBlock['rbsim_rbMove'] = function(block) {
    const rbType = block.getFieldValue('TYPE') || '1';
    const speed  = val(block, 'SPEED', '50');
    return `rbMove(${rbType}, ${speed})\n`;
  };

  pythonGenerator.forBlock['rbsim_light'] = function(block) {
    const port  = block.getFieldValue('PORT') || '1';
    const color = block.getFieldValue('COLOR') || '0';
    return `light(${port}, ${color})\n`;
  };

  pythonGenerator.forBlock['rbsim_reversalMotor'] = function(block) {
    const motorL = block.getFieldValue('MOTOR_L') || '1';
    const motorR = block.getFieldValue('MOTOR_R') || '2';
    const reType = block.getFieldValue('TYPE') || '4';
    return `reversalMotor(${motorL}, ${motorR}, ${reType})\n`;
  };

  pythonGenerator.forBlock['rbsim_lineinit'] = function(block) {
    const port  = block.getFieldValue('PORT') || '1';
    const color = block.getFieldValue('COLOR') || '1';
    return `lineinit(${port}, ${color})\n`;
  };

  pythonGenerator.forBlock['rbsim_linego'] = function(block) {
    const speed = val(block, 'SPEED', '50');
    return `linego(${speed})\n`;
  };

  pythonGenerator.forBlock['rbsim_linegoto'] = function(block) {
    const speed = val(block, 'SPEED', '50');
    const sec   = val(block, 'SEC', '1.0');
    return `linegoto(${speed}, ${sec})\n`;
  };

  pythonGenerator.forBlock['rbsim_linelr'] = function(block) {
    const speed = val(block, 'SPEED', '50');
    const still = block.getFieldValue('STILL') || '1';
    return `linelr(${speed}, ${still})\n`;
  };

  pythonGenerator.forBlock['rbsim_turnline'] = function(block) {
    const speedL = val(block, 'SPEED_L', '50');
    const speedR = val(block, 'SPEED_R', '50');
    const led    = val(block, 'LED', '0');
    return `turnline(${speedL}, ${speedR}, ${led})\n`;
  };

  pythonGenerator.forBlock['rbsim_motSpeed'] = function(block) {
    const port  = block.getFieldValue('PORT') || '1';
    const speed = val(block, 'SPEED', '50');
    return `motSpeed(${port}, ${speed})\n`;
  };

  pythonGenerator.forBlock['rbsim_motAngle'] = function(block) {
    const port  = block.getFieldValue('PORT') || '1';
    const speed = val(block, 'SPEED', '50');
    const angle = val(block, 'ANGLE', '90');
    return `motAngle(${port}, ${speed}, ${angle})\n`;
  };

  pythonGenerator.forBlock['rbsim_servo1'] = function(block) {
    const port  = block.getFieldValue('PORT') || '1';
    const angle = val(block, 'ANGLE', '90');
    return `servo1(${port}, ${angle})\n`;
  };

  pythonGenerator.forBlock['rbsim_servo2'] = function(block) {
    const port  = block.getFieldValue('PORT') || '1';
    const angle = val(block, 'ANGLE', '90');
    return `servo2(${port}, ${angle})\n`;
  };

  pythonGenerator.forBlock['rbsim_servo1ForTime'] = function(block) {
    const port  = block.getFieldValue('PORT') || '1';
    const angle = val(block, 'ANGLE', '90');
    const sec   = val(block, 'SEC', '1.0');
    return `servo1ForTime(${port}, ${angle}, ${sec})\n`;
  };

  pythonGenerator.forBlock['rbsim_servo2ForTime'] = function(block) {
    const port  = block.getFieldValue('PORT') || '1';
    const angle = val(block, 'ANGLE', '90');
    const sec   = val(block, 'SEC', '1.0');
    return `servo2ForTime(${port}, ${angle}, ${sec})\n`;
  };

  /* ----------------------------------------------------------
     GROUP 3 — SENSOR
     ---------------------------------------------------------- */
  pythonGenerator.forBlock['rbsim_getDist'] = function(block) {
    const port = block.getFieldValue('PORT') || '1';
    return [`getDist(${port})`, pythonGenerator.ORDER_FUNCTION_CALL];
  };

  pythonGenerator.forBlock['rbsim_getColor'] = function(block) {
    const port = block.getFieldValue('PORT') || '1';
    return [`getColor(${port})`, pythonGenerator.ORDER_FUNCTION_CALL];
  };

  /* ----------------------------------------------------------
     GROUP 5 — MATH supplements
     ---------------------------------------------------------- */
  pythonGenerator.forBlock['rbsim_math_abs'] = function(block) {
    const value = val(block, 'VALUE', '0');
    return [`abs(${value})`, pythonGenerator.ORDER_FUNCTION_CALL];
  };

  pythonGenerator.forBlock['rbsim_math_min'] = function(block) {
    const a = val(block, 'A', '0');
    const b = val(block, 'B', '0');
    return [`min(${a}, ${b})`, pythonGenerator.ORDER_FUNCTION_CALL];
  };

  pythonGenerator.forBlock['rbsim_math_max'] = function(block) {
    const a = val(block, 'A', '0');
    const b = val(block, 'B', '0');
    return [`max(${a}, ${b})`, pythonGenerator.ORDER_FUNCTION_CALL];
  };

  /* ----------------------------------------------------------
     GROUP 8 — LOOP supplements
     ---------------------------------------------------------- */
  pythonGenerator.forBlock['rbsim_while_true'] = function(block) {
    const body = pythonGenerator.statementToCode(block, 'BODY') || '    pass\n';
    return `while True:\n${body}`;
  };

  pythonGenerator.forBlock['rbsim_for_range'] = function(block) {
    const from = val(block, 'FROM', '0');
    const to   = val(block, 'TO', '10');
    const step = val(block, 'STEP', '1');
    const body = pythonGenerator.statementToCode(block, 'BODY') || '    pass\n';
    return `for i in range(${from}, ${to}, ${step}):\n${body}`;
  };

  /* ----------------------------------------------------------
     GROUP 10 — UTILITY
     ---------------------------------------------------------- */
  pythonGenerator.forBlock['rbsim_print'] = function(block) {
    const value = val(block, 'VALUE', '""');
    return `print(${value})\n`;
  };

  pythonGenerator.forBlock['rbsim_comment'] = function(block) {
    const text = block.getFieldValue('TEXT') || '';
    // Escape any newlines in user input
    const safe = text.replace(/\n/g, ' ');
    return `# ${safe}\n`;
  };

  pythonGenerator.forBlock['rbsim_pass'] = function(block) {
    return `pass\n`;
  };

  pythonGenerator.forBlock['rbsim_input'] = function(block) {
    const prompt = val(block, 'PROMPT', '""');
    return [`input(${prompt})`, pythonGenerator.ORDER_FUNCTION_CALL];
  };
}

// Export for ui.js
window.RbSimGenerators = { registerGenerators };
