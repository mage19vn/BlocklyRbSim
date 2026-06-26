import rcu
import _thread

def wait(sec : int): # cho trong sec giay
    rcu.SetWaitForTime(sec)

def stop(): # Dung robot
    rcu.SetMoveStop()

def getDist(port : int) -> int: # Tra ve khoan canh doc duoc tu cam bien sieu am
    # port : 1, 2, 3, ..., 8 <-> P1, P2, P3, ... ,P8
    return rcu.GetUltrasound(pory)

def getColor(port : int) -> int: # Tra ve mau sasc doc duoc tu cam bien mau
    # port : 1, 2, 3, ..., 8 <-> P1, P2, P3, ... ,P8
    return rcu.GetUltrasound(pory)

def light(port : int, color : int):
    color = color%8
    """
    port : 1, 2, 3, ..., 8 <-> P1, P2, P3, ... ,P8
    color:
        0 = OFF
        1 = RED
        2 = GREEN
        3 = BLUE
        4 = YELLOW
        5 = PURPLE
        6 = CYAN
        7 = WHITE
    """
    rcu.Set3CLed(port, color if (color) else 8) 

def reversalMotor(MotorLeft : int, MotorRight : int, reType : int):
    """
    MotorLeft va MotorRight: cac cong M1, M2, M3, M4 <-> 1, 2, 3, 4
    reType: 1, 2, 3, 4
    """
    relist = ["", "left_reversal", "right_reversal", "all_reversal", "no_reversal"]
    ty = relist[reType]
    rcu.SetMoveInitialize(MotorLeft, MotorRight, ty)

def goto(speed : int, sec : float): # Robot di chuyen thang hoac lui theo thoi gian
    if (speed > 0):
        rcu.SetMoveRunSecond("forward", speed, sec)
    else:
        rcu.SetMoveRunSecond("backward", speed, sec)
    stop()

def turnleft(speed : int, sec : float): # robot quay trai
    rcu.SetMoveRunSecond("turnleft", speed, sec)
    stop()

def turnright(speed : int, sec : float): # robot quay phai
    rcu.SetMoveRunSecond("turnright", speed, sec)
    stop()

def rbMove(rbType : int, speed : int): # Robot di chuyen theo toc do
    rblist = ["", "forward", "backward", "turnleft", "turnright"]
    srbType = rblist[rbType]
    rcu.SetMoveRun(srbType, speed)

def lineinit(port : int, color : int): # khoi tao module do line
    """
    port: P1, P2, ..., P8 <-> 1, 2, 3, ... , 8
    color: 1_black, 2_white
    """
    scolor = "white" if (color - 1) else "black"
    rcu.line_set_initialize(port, scolor, "wheeledchassis")

def linegoto(speed : int, sec : float): # Di chuyen theo line trong thoi gian
    msec = int(sec * 1000)
    rcu.line_millisecond(speed, msec)
    stop()

def linelr(speed : int, still : int): # Di chuyen theo line cho den khi gap nga re
    # 1 T. 2 lT. 3 rT
    """
    still: 1 - Nga 3, 2 - Ben trai, 3 - Ben phai
    """
    still = 17 if still == 1 else 1 if still == 2 else 7
    rcu.line_intersection_stop(speed, still)

def turnline(speedL : int, speedR : int, led : int): # Re tim line
    rcu.line_turn_encounterline(speedL, speedR, led)
    stop()

def motSpeed(port : int, speed : int): # Motor quay voi toc do trong thoi gian
    # port: 1, 2, 3, 4 - cac cong M1, M2, M3, M4 <-> 1, 2, 3, 4
    rcu.SetMotor(port, speed)

def motAngle(port : int, speed : int, addAngle : int): # Motor quay them goc addAngle theo toc do speed
    # port: 1, 2, 3, 4 - cac cong M1, M2, M3, M4 <-> 1, 2, 3, 4
    rcu.SetMotorServo(port, speed, addAngle)

def servo1(port : int, angle : int): # Xoay servo toi goc
    # port: 1, 2, 3 <=> P4, P5, P6
    rcu.SetServo(port, angle)

def servo2(port : int, angle : int): # Xoay servor toi goc nhung khac cau lenh
    # port: 1, 2, 3 <=> P4, P5, P6
    rcu.SetSeeringEngine(port, angle)

def servo1ForTime(port : int, angle : int, sec : float): # Xoay servo toi goc theo thoi gian
    # port: 1, 2, 3 <=> P4, P5, P6
    mSec = int(sec*1000)
    rcu.SetServoTime(port, angle, mSec)

def servo2ForTime(port : int, angle : int, sec : float): # Xoay servo toi goc theo thoi gian nhung khac cau lenh
    # port: 1, 2, 3 <=> P4, P5, P6
    mSec = int(sec*1000)
    rcu.SetSeeringEngineTime(port, angle, mSec)

def task1():
  pass

def task2():
  pass

_thread.start_new_thread(task1,())
_thread.start_new_thread(task2,())

while 1:
  pass
