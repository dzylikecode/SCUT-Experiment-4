import { robot } from "./robot.js";

// 自动控制
function autoControl() {
  let ES = 25;
  let iSPD = 29;
  let KP = 0.81;
  while (1) {
    let EP = robot.colorSensor - ES;
    let dSPD = KP * EP;
    robot.motorB = iSPD + dSPD;
    robot.motorC = iSPD - dSPD;
  }
}

let wait;
let beep;
let record;

function test() {
  wait(5); // 秒
  beep(2093, 0.5, 100, 0); // 频率, 时间, 音量, 类型
  record(robot.colorSensor, 12, 15, 0); // 传感器, 采样时间, 采样速率, 速率单位
  beep(2093, 0.5, 100, 0);
}
