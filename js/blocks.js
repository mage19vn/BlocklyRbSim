/**
 * blocks.js — RbSim Code Generator
 * Coder: Mage__
 *
 * Defines all 10 block groups for the RbSim Blockly toolbox.
 * Each block has: color, tooltip, fields matching Python function params.
 *
 * v2: PORT fields → FieldDropdown (P1-P8 / M1-M4 / P4-P6)
 *     Robot control blocks → single-line (setInputsInline true)
 */

'use strict';

/* ============================================================
   BLOCK COLOR PALETTE
   ============================================================ */
const COLORS = {
  TASK:      '#f97316',  // orange   — Group 1: Task Init
  ROBOT:     '#ef4444',  // red      — Group 2: Robot Control
  SENSOR:    '#22c55e',  // green    — Group 3: Sensor
  VAR:       '#f59e0b',  // amber    — Group 4: Variables
  MATH:      '#3b82f6',  // blue     — Group 5: Math
  LOGIC:     '#6366f1',  // indigo   — Group 6: Logic
  CONDITION: '#8b5cf6',  // violet   — Group 7: Condition
  LOOP:      '#10b981',  // emerald  — Group 8: Loop
  FUNCTION:  '#a855f7',  // purple   — Group 9: Function
  UTILITY:   '#06b6d4',  // cyan     — Group 10: Utility
};

/* ============================================================
   PORT DROPDOWN OPTIONS
   ============================================================ */
const PORT_P1_P8 = [
  ['P1','1'],['P2','2'],['P3','3'],['P4','4'],
  ['P5','5'],['P6','6'],['P7','7'],['P8','8']
];

const PORT_M1_M4 = [
  ['M1','1'],['M2','2'],['M3','3'],['M4','4']
];

const PORT_SERVO = [
  ['P4 → 1','1'],['P5 → 2','2'],['P6 → 3','3']
];

/* ============================================================
   GROUP 1 — TASK INIT
   ============================================================ */
Blockly.Blocks['rbsim_task_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('⚙️  Khởi tạo')
        .appendField(new Blockly.FieldDropdown([
          ['Task 1','task1'],['Task 2','task2'],['Task 3','task3'],['Task 4','task4'],
          ['Task 5','task5'],['Task 6','task6'],['Task 7','task7'],['Task 8','task8'],
        ]), 'TASK_ID');
    this.appendStatementInput('BODY')
        .setCheck(null)
        .appendField('  thực hiện');
    this.setColour(COLORS.TASK);
    this.setTooltip('Khởi tạo một Task. Nếu workspace có ≥2 task, code sẽ dùng đa luồng (_thread).');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
  }
};

/* ============================================================
   GROUP 2 — ROBOT CONTROL  (all inline, 1 dòng)
   ============================================================ */

// WAIT — wait(sec)
Blockly.Blocks['rbsim_wait'] = {
  init: function() {
    this.appendValueInput('SEC')
        .setCheck('Number')
        .appendField('⏱️  Chờ');
    this.appendDummyInput().appendField('giây');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('wait(sec) — Dừng sec giây  •  sec: int');
  }
};

// STOP — stop()
Blockly.Blocks['rbsim_stop'] = {
  init: function() {
    this.appendDummyInput().appendField('🛑  Dừng robot');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('stop() — Dừng robot ngay lập tức.');
  }
};

// GOTO — goto(speed, sec)
Blockly.Blocks['rbsim_goto'] = {
  init: function() {
    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('🚀  Di chuyển  tốc độ');
    this.appendValueInput('SEC')
        .setCheck('Number')
        .appendField('trong');
    this.appendDummyInput().appendField('giây');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('goto(speed, sec)  •  speed: int (dương=tiến, âm=lùi)  •  sec: float');
  }
};

// TURN — turn(leftorright, speed, sec)
Blockly.Blocks['rbsim_turn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔄  Quay')
        .appendField(new Blockly.FieldDropdown([
          ['Trái (1)','1'],['Phải (2)','2']
        ]), 'DIR');
    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('tốc độ');
    this.appendValueInput('SEC')
        .setCheck('Number')
        .appendField('trong');
    this.appendDummyInput().appendField('giây');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('turn(leftorright, speed, sec)  •  dir: 1=trái, 2=phải  •  speed: int  •  sec: float');
  }
};

// RBMOVE — rbMove(rbType, speed)
Blockly.Blocks['rbsim_rbMove'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🎮  Di chuyển liên tục')
        .appendField(new Blockly.FieldDropdown([
          ['Tiến ↑','1'],['Lùi ↓','2'],['Trái ←','3'],['Phải →','4'],
        ]), 'TYPE');
    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('tốc độ');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('rbMove(rbType, speed) — Di chuyển không dừng tự động  •  speed: int');
  }
};

// LIGHT — light(port, color)  → PORT dropdown P1-P8
Blockly.Blocks['rbsim_light'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('💡  Đèn LED cổng')
        .appendField(new Blockly.FieldDropdown(PORT_P1_P8), 'PORT')
        .appendField('màu')
        .appendField(new Blockly.FieldDropdown([
          ['Tắt (0)','0'],['Đỏ (1)','1'],['Xanh lá (2)','2'],
          ['Xanh dương (3)','3'],['Vàng (4)','4'],
          ['Tím (5)','5'],['Cyan (6)','6'],['Trắng (7)','7'],
        ]), 'COLOR');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('light(port, color)  •  port: P1-P8  •  color: 0=Tắt … 7=Trắng');
  }
};

// REVERSAL MOTOR — reversalMotor(MotorLeft, MotorRight, reType)  → PORT dropdown M1-M4
Blockly.Blocks['rbsim_reversalMotor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔄  Chiều Motor  Trái')
        .appendField(new Blockly.FieldDropdown(PORT_M1_M4), 'MOTOR_L')
        .appendField('Phải')
        .appendField(new Blockly.FieldDropdown(PORT_M1_M4), 'MOTOR_R')
        .appendField('kiểu')
        .appendField(new Blockly.FieldDropdown([
          ['Đảo trái (1)','1'],['Đảo phải (2)','2'],
          ['Đảo cả hai (3)','3'],['Không đảo (4)','4'],
        ]), 'TYPE');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('reversalMotor(MotorLeft, MotorRight, reType)  •  cổng M1-M4');
  }
};

// LINE INIT — lineinit(port, color)  → PORT dropdown P1-P8
Blockly.Blocks['rbsim_lineinit'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('📏  Khởi tạo cảm biến Line cổng')
        .appendField(new Blockly.FieldDropdown(PORT_P1_P8), 'PORT')
        .appendField('màu line')
        .appendField(new Blockly.FieldDropdown([
          ['Đen (1)','1'],['Trắng (2)','2'],
        ]), 'COLOR');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('lineinit(port, color)  •  port: P1-P8  •  color: 1=đen, 2=trắng');
  }
};

// LINE GO — linego(speed)
Blockly.Blocks['rbsim_linego'] = {
  init: function() {
    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('➡️  Đi theo line liên tục tốc độ');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('linego(speed)  •  speed: int');
  }
};

// LINE GOTO — linegoto(speed, sec)
Blockly.Blocks['rbsim_linegoto'] = {
  init: function() {
    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('➡️  Đi theo line  tốc độ');
    this.appendValueInput('SEC')
        .setCheck('Number')
        .appendField('trong');
    this.appendDummyInput().appendField('giây');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('linegoto(speed, sec)  •  speed: int  •  sec: float');
  }
};

// LINE LR — linelr(speed, still)
Blockly.Blocks['rbsim_linelr'] = {
  init: function() {
    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('🔀  Đi line đến ngã rẽ  tốc độ');
    this.appendDummyInput()
        .appendField('dừng tại')
        .appendField(new Blockly.FieldDropdown([
          ['Ngã 3 (1)','1'],['Rẽ trái (2)','2'],['Rẽ phải (3)','3'],
        ]), 'STILL');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('linelr(speed, still)  •  still: 1=ngã3, 2=rẽtrái, 3=rẽphải');
  }
};

// TURN LINE — turnline(speedL, speedR, led)
Blockly.Blocks['rbsim_turnline'] = {
  init: function() {
    this.appendValueInput('SPEED_L')
        .setCheck('Number')
        .appendField('↗️  Rẽ tìm line  bánh Trái');
    this.appendValueInput('SPEED_R')
        .setCheck('Number')
        .appendField('bánh Phải');
    this.appendValueInput('LED')
        .setCheck('Number')
        .appendField('led');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('turnline(speedL, speedR, led)  •  speedL/R: int  •  led: int');
  }
};

// MOTOR SPEED — motSpeed(port, speed)  → PORT dropdown M1-M4
Blockly.Blocks['rbsim_motSpeed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('⚙️  Motor cổng')
        .appendField(new Blockly.FieldDropdown(PORT_M1_M4), 'PORT');
    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('tốc độ');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('motSpeed(port, speed)  •  port: M1-M4  •  speed: int');
  }
};

// MOTOR ANGLE — motAngle(port, speed, addAngle)  → PORT dropdown M1-M4
Blockly.Blocks['rbsim_motAngle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('📐  Motor cổng')
        .appendField(new Blockly.FieldDropdown(PORT_M1_M4), 'PORT');
    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('tốc độ');
    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField('thêm');
    this.appendDummyInput().appendField('°');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('motAngle(port, speed, addAngle)  •  port: M1-M4  •  speed: int  •  addAngle: int °');
  }
};

// SERVO 1 — servo1(port, angle)  → PORT dropdown P4-P6
Blockly.Blocks['rbsim_servo1'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔧  Servo1 cổng')
        .appendField(new Blockly.FieldDropdown(PORT_SERVO), 'PORT');
    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField('tới góc');
    this.appendDummyInput().appendField('°');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('servo1(port, angle) — SetServo  •  port: P4/P5/P6  •  angle: int °');
  }
};

// SERVO 2 — servo2(port, angle)  → PORT dropdown P4-P6
Blockly.Blocks['rbsim_servo2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🔩  Servo2 cổng')
        .appendField(new Blockly.FieldDropdown(PORT_SERVO), 'PORT');
    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField('tới góc');
    this.appendDummyInput().appendField('°');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('servo2(port, angle) — SetSeeringEngine  •  port: P4/P5/P6  •  angle: int °');
  }
};

// SERVO 1 FOR TIME — servo1ForTime(port, angle, sec)  → PORT dropdown P4-P6
Blockly.Blocks['rbsim_servo1ForTime'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('⏱️🔧  Servo1 cổng')
        .appendField(new Blockly.FieldDropdown(PORT_SERVO), 'PORT');
    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField('tới');
    this.appendValueInput('SEC')
        .setCheck('Number')
        .appendField('° trong');
    this.appendDummyInput().appendField('giây');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('servo1ForTime(port, angle, sec) — SetServoTime  •  port: P4/P5/P6  •  angle: int °  •  sec: float');
  }
};

// SERVO 2 FOR TIME — servo2ForTime(port, angle, sec)  → PORT dropdown P4-P6
Blockly.Blocks['rbsim_servo2ForTime'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('⏱️🔩  Servo2 cổng')
        .appendField(new Blockly.FieldDropdown(PORT_SERVO), 'PORT');
    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField('tới');
    this.appendValueInput('SEC')
        .setCheck('Number')
        .appendField('° trong');
    this.appendDummyInput().appendField('giây');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.ROBOT);
    this.setTooltip('servo2ForTime(port, angle, sec) — SetSeeringEngineTime  •  port: P4/P5/P6  •  angle: int °  •  sec: float');
  }
};

/* ============================================================
   GROUP 3 — SENSOR  (PORT dropdown P1-P8, inline)
   ============================================================ */

// GET DISTANCE — getDist(port) → int
Blockly.Blocks['rbsim_getDist'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('📡  Khoảng cách siêu âm cổng')
        .appendField(new Blockly.FieldDropdown(PORT_P1_P8), 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(COLORS.SENSOR);
    this.setTooltip('getDist(port) → int — Đọc khoảng cách siêu âm  •  port: P1-P8');
  }
};

// GET COLOR — getColor(port) → int
Blockly.Blocks['rbsim_getColor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('🎨  Màu sắc cảm biến cổng')
        .appendField(new Blockly.FieldDropdown(PORT_P1_P8), 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(COLORS.SENSOR);
    this.setTooltip('getColor(port) → int — Đọc màu cảm biến  •  port: P1-P8');
  }
};

/* ============================================================
   GROUP 5 — MATH supplements
   ============================================================ */
Blockly.Blocks['rbsim_math_abs'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendField('|');
    this.appendDummyInput().appendField('|');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(COLORS.MATH);
    this.setTooltip('abs(value) — Giá trị tuyệt đối.');
  }
};

Blockly.Blocks['rbsim_math_min'] = {
  init: function() {
    this.appendValueInput('A').setCheck('Number').appendField('min(');
    this.appendValueInput('B').setCheck('Number').appendField(',');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(COLORS.MATH);
    this.setTooltip('min(a, b) — Giá trị nhỏ hơn.');
  }
};

Blockly.Blocks['rbsim_math_max'] = {
  init: function() {
    this.appendValueInput('A').setCheck('Number').appendField('max(');
    this.appendValueInput('B').setCheck('Number').appendField(',');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(COLORS.MATH);
    this.setTooltip('max(a, b) — Giá trị lớn hơn.');
  }
};

/* ============================================================
   GROUP 8 — LOOP supplements
   ============================================================ */
Blockly.Blocks['rbsim_while_true'] = {
  init: function() {
    this.appendDummyInput().appendField('🔁  Lặp mãi mãi  (while True)');
    this.appendStatementInput('BODY').setCheck(null).appendField('  thực hiện');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.LOOP);
    this.setTooltip('while True: — Lặp mãi. Dùng "ngắt vòng lặp" để thoát.');
  }
};

Blockly.Blocks['rbsim_for_range'] = {
  init: function() {
    this.appendValueInput('FROM').setCheck('Number').appendField('🔢  for i từ');
    this.appendValueInput('TO').setCheck('Number').appendField('đến');
    this.appendValueInput('STEP').setCheck('Number').appendField('bước');
    this.appendStatementInput('BODY').setCheck(null).appendField('  thực hiện');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.LOOP);
    this.setTooltip('for i in range(from, to, step):');
  }
};

/* ============================================================
   GROUP 10 — UTILITY
   ============================================================ */
Blockly.Blocks['rbsim_print'] = {
  init: function() {
    this.appendValueInput('VALUE').setCheck(null).appendField('🖨️  print(');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.UTILITY);
    this.setTooltip('print(value) — In giá trị ra console.');
  }
};

Blockly.Blocks['rbsim_comment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('💬  #')
        .appendField(new Blockly.FieldTextInput('ghi chú...'), 'TEXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.UTILITY);
    this.setTooltip('Thêm comment vào code Python.');
  }
};

Blockly.Blocks['rbsim_pass'] = {
  init: function() {
    this.appendDummyInput().appendField('⬜  pass');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLORS.UTILITY);
    this.setTooltip('pass — Không làm gì (placeholder).');
  }
};

Blockly.Blocks['rbsim_input'] = {
  init: function() {
    this.appendValueInput('PROMPT').setCheck('String').appendField('⌨️  input(');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.setColour(COLORS.UTILITY);
    this.setTooltip('input(prompt) → String — Đọc chuỗi từ người dùng nhập.');
  }
};
