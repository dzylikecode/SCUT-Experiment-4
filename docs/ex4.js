/**
 * KP = 0.7
 * KI = 0.005
 * KD = 4 to 60
 */

import { robot } from "./robot";

/**
 * KP = 1.1
 * KI = 0.015
 * KD = 12 to 80
 */

function main() {
  let KP = 1.2;
  let KI = 0.015;
  let KD = 25;
  let EP = 0;
  let EI = 0;
  let ED = 0;
  let ES = 27;
  let iSPD = 60;
  let dSPD = 0;
  while (1) {
    let EP_L = EP;
    EP = robot.colorSensor - ES;
    EI = EI + EP;
    ED = EP - EP_L;
    let resP = KP * EP;
    let resI = KI * EI;
    let resD = KD * ED;
    dSPD = resP + resI + resD;
    robot.motorB(iSPD + dSPD);
    robot.motorC(iSPD - dSPD);
  }
}
