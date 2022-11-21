import { robot } from "./robot";

function logData() {
  let log;
  log.record([robot.motorB, robot.motorC], 20); // 单位20/s
  robot.motorB(30); // 功率
  robot.motorC(30);
  let wait;
  wait(robot.motorB, directAny, 400, degree); // 400/s
  robot.motorB(0); //stop
  robot.motorC(0);
  wait(1);
  log.stop();
}

function control_1() {
  robot.gyroSensor.reset();
  robot.motorB(20);
  robot.motorC(-20);
  wait(robot.gyroSensor, directAny, 90, degree);
}

// 矩形
function control_2() {
  robot.gyroSensor.reset();
  for (let i = 0; i < 4; i++) {
    // 直线
    robot.motorB(30);
    robot.motorC(30);
    wait(robot.motorB, directAny, 400, degree); // 400/s
    // 旋转
    robot.motorB(20);
    robot.motorC(-20);
    wait(robot.gyroSensor, directAny, 90, degree);
  }
}

// 直线
function control_3() {
  let ES = 460;
  let KP = -0.25;
  let EP = 0;
  let KM = 1.01;
  do {
    EP = (robot.motorB + robot.motorC) / 2 - ES;
    let tmp = KP * EP + 5; // 增加惯性量, 突破极限
    robot.motorB(KM * tmp);
    robot.motorC(tmp);
  } while (EP < 0);
}
// 旋转
function control_4() {
  let ES = 90;
  let KP = -1;
  let EP = 0;
  let KM = 1.01;
  robot.gyroSensor.reset();
  robot.motorCDirectionReverse(true);
  do {
    EP = robot.gyroSensor - ES;
    let tmp = KP * EP + 5;
    robot.motorB(KM * tmp);
    robot.motorC(tmp);
  } while (EP < 0);
  robot.motorCDirectionReverse(false);
}

function control_5() {
  robot.gyroSensor.reset();
  for (let i = 0; i < 4; i++) {
    let ES = 460;
    let KP = -0.25;
    let EP = 0;
    line();
    ES = 90;
    KP = -1;
    EP = 0;
    turn();
  }
  function line() {
    KP = -0.25;
    EP = 0;
    KM = 1.01;
    ES = (robot.motorB + robot.motorC) / 2 + ES;
    do {
      EP = (robot.motorB + robot.motorC) / 2 - ES;
      let tmp = KP * EP + 5; // 增加惯性量, 突破极限
      robot.motorB(KM * tmp);
      robot.motorC(tmp);
    } while (EP < 0);
  }
  function turn() {
    KP = -1;
    EP = 0;
    KM = 1.01;
    ES = ES + robot.gyroSensor;
    robot.motorCDirectionReverse(true);
    do {
      EP = robot.gyroSensor - ES;
      let tmp = KP * EP + 5;
      robot.motorB(KM * tmp);
      robot.motorC(tmp);
    } while (EP < 0);
    robot.motorCDirectionReverse(false);
  }
}
