/**
 * toolbox.js — RbSim Code Generator
 * Coder: Mage__
 *
 * Blockly toolbox configuration (JSON format for Blockly v10+).
 * Each category maps to one of the 10 block groups.
 */

'use strict';

const TOOLBOX_CONFIG = {
  kind: 'categoryToolbox',
  contents: [

    /* ========================================================
       GROUP 1 — TASK INIT
       ======================================================== */
    {
      kind: 'category',
      name: '⚙️  Khởi tạo Task',
      colour: '#f97316',
      contents: [
        {
          kind: 'block',
          type: 'rbsim_task_init',
          fields: { TASK_ID: 'task1' }
        }
      ]
    },

    /* ========================================================
       GROUP 2.1 — ĐIỀU KHIỂN
       ======================================================== */
    {
      kind: 'category',
      name: '🕹️  Điều khiển',
      colour: '#ef4444',
      contents: [
        // Wait
        {
          kind: 'block',
          type: 'rbsim_wait',
          inputs: {
            SEC: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
          }
        },
        // Stop
        { kind: 'block', type: 'rbsim_stop' },
        // Goto
        {
          kind: 'block',
          type: 'rbsim_goto',
          inputs: {
            SPEED: { shadow: { type: 'math_number', fields: { NUM: 50 } } },
            SEC:   { shadow: { type: 'math_number', fields: { NUM: 1.0 } } }
          }
        },
        // Turn
        {
          kind: 'block',
          type: 'rbsim_turn',
          inputs: {
            SPEED: { shadow: { type: 'math_number', fields: { NUM: 50 } } },
            SEC:   { shadow: { type: 'math_number', fields: { NUM: 0.5 } } }
          }
        },
        // rbMove
        {
          kind: 'block',
          type: 'rbsim_rbMove',
          fields: { TYPE: '1' },
          inputs: {
            SPEED: { shadow: { type: 'math_number', fields: { NUM: 50 } } }
          }
        },
        // Light
        {
          kind: 'block',
          type: 'rbsim_light',
          fields: { PORT: '1', COLOR: '1' }
        }
      ]
    },

    /* ========================================================
       GROUP 2.2 — DÒ LINE
       ======================================================== */
    {
      kind: 'category',
      name: '〰️  Dò line',
      colour: '#f43f5e',
      contents: [
        // Line Init
        {
          kind: 'block',
          type: 'rbsim_lineinit',
          fields: { PORT: '1', COLOR: '1' }
        },
        // Line Go
        {
          kind: 'block',
          type: 'rbsim_linego',
          inputs: {
            SPEED: { shadow: { type: 'math_number', fields: { NUM: 50 } } }
          }
        },
        // Line Goto
        {
          kind: 'block',
          type: 'rbsim_linegoto',
          inputs: {
            SPEED: { shadow: { type: 'math_number', fields: { NUM: 50 } } },
            SEC:   { shadow: { type: 'math_number', fields: { NUM: 1.0 } } }
          }
        },
        // Line LR
        {
          kind: 'block',
          type: 'rbsim_linelr',
          fields: { STILL: '1' },
          inputs: {
            SPEED: { shadow: { type: 'math_number', fields: { NUM: 50 } } }
          }
        },
        // Turn Line
        {
          kind: 'block',
          type: 'rbsim_turnline',
          inputs: {
            SPEED_L: { shadow: { type: 'math_number', fields: { NUM: 50 } } },
            SPEED_R: { shadow: { type: 'math_number', fields: { NUM: 50 } } },
            LED:     { shadow: { type: 'math_number', fields: { NUM: 0 } } }
          }
        }
      ]
    },

    /* ========================================================
       GROUP 2.3 — MOTOR & SERVO
       ======================================================== */
    {
      kind: 'category',
      name: '⚙️  Motor',
      colour: '#ec4899',
      contents: [
        // Reversal Motor
        {
          kind: 'block',
          type: 'rbsim_reversalMotor',
          fields: { MOTOR_L: '1', MOTOR_R: '2', TYPE: '4' }
        },
        // Motor Speed
        {
          kind: 'block',
          type: 'rbsim_motSpeed',
          fields: { PORT: '1' },
          inputs: {
            SPEED: { shadow: { type: 'math_number', fields: { NUM: 50 } } }
          }
        },
        // Motor Angle
        {
          kind: 'block',
          type: 'rbsim_motAngle',
          fields: { PORT: '1' },
          inputs: {
            SPEED: { shadow: { type: 'math_number', fields: { NUM: 50 } } },
            ANGLE: { shadow: { type: 'math_number', fields: { NUM: 90 } } }
          }
        },
        // Servo 1
        {
          kind: 'block',
          type: 'rbsim_servo1',
          fields: { PORT: '1' },
          inputs: {
            ANGLE: { shadow: { type: 'math_number', fields: { NUM: 90 } } }
          }
        },
        // Servo 2
        {
          kind: 'block',
          type: 'rbsim_servo2',
          fields: { PORT: '1' },
          inputs: {
            ANGLE: { shadow: { type: 'math_number', fields: { NUM: 90 } } }
          }
        },
        // Servo 1 For Time
        {
          kind: 'block',
          type: 'rbsim_servo1ForTime',
          fields: { PORT: '1' },
          inputs: {
            ANGLE: { shadow: { type: 'math_number', fields: { NUM: 90 } } },
            SEC:   { shadow: { type: 'math_number', fields: { NUM: 1.0 } } }
          }
        },
        // Servo 2 For Time
        {
          kind: 'block',
          type: 'rbsim_servo2ForTime',
          fields: { PORT: '1' },
          inputs: {
            ANGLE: { shadow: { type: 'math_number', fields: { NUM: 90 } } },
            SEC:   { shadow: { type: 'math_number', fields: { NUM: 1.0 } } }
          }
        }
      ]
    },

    /* ========================================================
       GROUP 3 — SENSOR
       ======================================================== */
    {
      kind: 'category',
      name: '📡  Cảm biến',
      colour: '#22c55e',
      contents: [
        {
          kind: 'block',
          type: 'rbsim_getDist',
          fields: { PORT: '1' }
        },
        {
          kind: 'block',
          type: 'rbsim_getColor',
          fields: { PORT: '1' }
        },
        { kind: 'block', type: 'rbsim_ai_road_offset' },
        { kind: 'block', type: 'rbsim_ai_road_left' },
        { kind: 'block', type: 'rbsim_ai_road_right' },
        { kind: 'block', type: 'rbsim_ai_task_id' },
        { kind: 'block', type: 'rbsim_ai_traffic_sign' },
        { kind: 'block', type: 'rbsim_ai_forest' }
      ]
    },

    /* ========================================================
       GROUP 4 — VARIABLES (Blockly built-in)
       ======================================================== */
    {
      kind: 'category',
      name: '📦  Biến',
      colour: '#f59e0b',
      custom: 'VARIABLE'
    },

    /* ========================================================
       GROUP 5 — MATH
       ======================================================== */
    {
      kind: 'category',
      name: '🔢  Toán học',
      colour: '#3b82f6',
      contents: [
        { kind: 'block', type: 'math_number', fields: { NUM: 0 } },
        {
          kind: 'block',
          type: 'math_arithmetic',
          fields: { OP: 'ADD' },
          inputs: {
            A: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            B: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
          }
        },
        {
          kind: 'block',
          type: 'math_arithmetic',
          fields: { OP: 'MINUS' },
          inputs: {
            A: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            B: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
          }
        },
        {
          kind: 'block',
          type: 'math_arithmetic',
          fields: { OP: 'MULTIPLY' },
          inputs: {
            A: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            B: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
          }
        },
        {
          kind: 'block',
          type: 'math_arithmetic',
          fields: { OP: 'DIVIDE' },
          inputs: {
            A: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            B: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
          }
        },
        {
          kind: 'block',
          type: 'math_arithmetic',
          fields: { OP: 'MODULO' },
          inputs: {
            A: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
            B: { shadow: { type: 'math_number', fields: { NUM: 3 } } }
          }
        },
        {
          kind: 'block',
          type: 'rbsim_math_abs',
          inputs: {
            VALUE: { shadow: { type: 'math_number', fields: { NUM: -5 } } }
          }
        },
        {
          kind: 'block',
          type: 'rbsim_math_min',
          inputs: {
            A: { shadow: { type: 'math_number', fields: { NUM: 3 } } },
            B: { shadow: { type: 'math_number', fields: { NUM: 7 } } }
          }
        },
        {
          kind: 'block',
          type: 'rbsim_math_max',
          inputs: {
            A: { shadow: { type: 'math_number', fields: { NUM: 3 } } },
            B: { shadow: { type: 'math_number', fields: { NUM: 7 } } }
          }
        },
        {
          kind: 'block',
          type: 'math_random_int',
          inputs: {
            FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            TO:   { shadow: { type: 'math_number', fields: { NUM: 100 } } }
          }
        }
      ]
    },

    /* ========================================================
       GROUP 6 — LOGIC
       ======================================================== */
    {
      kind: 'category',
      name: '⚖️  Logic',
      colour: '#6366f1',
      contents: [
        {
          kind: 'block',
          type: 'logic_compare',
          fields: { OP: 'EQ' },
          inputs: {
            A: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            B: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
          }
        },
        {
          kind: 'block',
          type: 'logic_operation',
          fields: { OP: 'AND' }
        },
        {
          kind: 'block',
          type: 'logic_negate'
        },
        {
          kind: 'block',
          type: 'logic_boolean',
          fields: { BOOL: 'TRUE' }
        },
        {
          kind: 'block',
          type: 'logic_boolean',
          fields: { BOOL: 'FALSE' }
        }
      ]
    },

    /* ========================================================
       GROUP 7 — CONDITION (if / if-else / if-elif-else)
       ======================================================== */
    {
      kind: 'category',
      name: '🔀  Điều kiện',
      colour: '#8b5cf6',
      contents: [
        // if
        { kind: 'block', type: 'controls_if' },
        // if-else
        {
          kind: 'block',
          type: 'controls_if',
          extraState: { elseCount: 1 }
        },
        // if-elif-else
        {
          kind: 'block',
          type: 'controls_if',
          extraState: { elseIfCount: 1, elseCount: 1 }
        }
      ]
    },

    /* ========================================================
       GROUP 8 — LOOP
       ======================================================== */
    {
      kind: 'category',
      name: '🔁  Vòng lặp',
      colour: '#10b981',
      contents: [
        // for (repeat N times)
        {
          kind: 'block',
          type: 'controls_repeat_ext',
          inputs: {
            TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
          }
        },
        // while
        { kind: 'block', type: 'controls_whileUntil', fields: { MODE: 'WHILE' } },
        // while True (custom)
        { kind: 'block', type: 'rbsim_while_true' },
        // for range (custom)
        {
          kind: 'block',
          type: 'rbsim_for_range',
          inputs: {
            FROM: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            TO:   { shadow: { type: 'math_number', fields: { NUM: 10 } } },
            STEP: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
          }
        },
        // break
        { kind: 'block', type: 'controls_flow_statements', fields: { FLOW: 'BREAK' } },
        // continue
        { kind: 'block', type: 'controls_flow_statements', fields: { FLOW: 'CONTINUE' } }
      ]
    },

    /* ========================================================
       GROUP 9 — FUNCTION (Blockly built-in PROCEDURE)
       ======================================================== */
    {
      kind: 'category',
      name: '🧩  Hàm',
      colour: '#a855f7',
      custom: 'PROCEDURE'
    },

    /* ========================================================
       GROUP 10 — UTILITY
       ======================================================== */
    {
      kind: 'category',
      name: '🛠️  Tiện ích Python',
      colour: '#06b6d4',
      contents: [
        {
          kind: 'block',
          type: 'rbsim_print',
          inputs: {
            VALUE: { shadow: { type: 'text', fields: { TEXT: 'Hello RbSim' } } }
          }
        },
        { kind: 'block', type: 'rbsim_comment' },
        { kind: 'block', type: 'rbsim_pass' },
        {
          kind: 'block',
          type: 'rbsim_input',
          inputs: {
            PROMPT: { shadow: { type: 'text', fields: { TEXT: 'Nhập giá trị: ' } } }
          }
        }
      ]
    }

  ]
};

// Export
window.RbSimToolbox = TOOLBOX_CONFIG;
