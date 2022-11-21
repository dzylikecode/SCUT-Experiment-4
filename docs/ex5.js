import { robot } from "./robot.js";

function main() {
  let kpwr = 1;
  let gang;
  let gspd;
  let mpos;
  let mspd;
  let msum;
  let msub;
  let mdp;
  let mdp1;
  let mpd2;
  let mpd3;
  let dspd;
  let sspd;
  let tint;
  showEye();
  RS();
  let res;
  let n = 0;
  do {
    let t1 = getTimer(1); // id
    IT(n);
    GP();
    MP();
    LQR();
    RC();
    res = FC();
    let t2 = getTimer(1);
    let deltaTime = 0.005 - (t2 - t1);
    wait(deltaTime);
  } while (res);
  return;
  function RS() {
    gang = -0.25;
    gspd = 0;
    mpos = 0;
    mspd = 0;
    msum = 0;
    msub = 0;
    mdp = 0;
    mdp1 = 0;
    mpd2 = 0;
    mpd3 = 0;
    dspd = 0;
    sspd = 0;
    resetTimer(1);
  }
  function IT(n) {
    let clp = n + 1;
    if (n) {
      tint = getTimer(1) / clp;
    } else {
      tint = 0.014;
    }
  }
  function GP() {
    gspd = robot.gyroSensor;
    gang = gang + gspd * tint;
  }
  function MP() {
    msum1 = msum;
    let A = robot.motorA;
    let D = robot.motorD;
    msum = D + A;
    msub = D - A;
    mdp = msum - msum1;
    mpos = mpos - mdp;
    mpos = mpos - dspd * tint * 2;
    let tmp = mdp + mdp1 + mdp2 + mdp3;
    mspd = tmp / 4 / tint;
    mdp3 = mpd2;
    mdp2 = mdp1;
    mdp = mdp1;
  }
  function LQR() {
    let tmp1 = 15 * gspd + 0.8 * gang;
    let tmp2 = 0.12 * mspd + 0.08 * mpos;
    pwr = tmp1 + tmp2;
  }
  function RC() {
    let tmp1 = 0.1 * sspd;
    let tmp2 = -0.02 * dspd;
    robot.motorA = (pwr + tmp2 - tmp1) / kpwr;
    robot.motorD = (pwr + tmp2 + tmp1) / kpwr;
  }
  function FC() {
    let res = pwr >= 100;
    if (res == false) {
      resetTimer(2);
    }
    if (getTimer(2) >= 0.1) {
      return true;
    }
    return false;
  }
}

// 显示界面
// 多个进程
function show() {
  wait(1);
  let dspd = 30;
  let sspd = 0;
  wait(4);
  dspd = 0;
  sspd = 0;
  while (1) {
    Text(`GP: ${gang.fix(2)}`, 0, 2, 2); // 位置x,y和字体
    Text(`GS: ${gspd.fix(2)}`, 0, 4, 2); // 位置x,y和字体
    Text(`MP: ${mpos.fix(2)}`, 0, 6, 2); // 位置x,y和字体
    Text(`MS: ${mspd.fix(2)}`, 0, 8, 2); // 位置x,y和字体
    wait(5);
  }
}
