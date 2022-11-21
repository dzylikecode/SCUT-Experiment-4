import { robot } from "./robot";

function main() {
  wait(1);
  dspd = 0;
  sspd = 30;
  dkp = 0;
  skp = 1;
  imove();
  while (getTimer(2) < 2) {
    move();
  }
  switch (robot.color) {
    case "white":
      beep(1864, 0.1, 100, 1); // hz, s, db, type
      showEye(Neutral);
      dspd = 0;
      sspd = 0;
      dkp = 0;
      skp = 1;
      imove();
      break;
    case "red":
      beep(1864, 0.1, 100, 1); // hz, s, db, type
      showEye(Up);
      dspd = -60;
      sspd = 0;
      dkp = 0;
      skp = 1;
      imove();
      break;
    case "green":
      beep(1864, 0.1, 100, 1); // hz, s, db, type
      showEye(down);
      dspd = 60;
      sspd = 0;
      dkp = 0;
      skp = 1;
      imove();
      break;
    case "blue":
      beep(1864, 0.1, 100, 1); // hz, s, db, type
      showEye(left);
      dspd = 0;
      sspd = 100;
      dkp = 0;
      skp = 0;
      imove();
      break;
    case "yellow":
      beep(1864, 0.1, 100, 1); // hz, s, db, type
      showEye(right);
      dspd = 0;
      sspd = -100;
      dkp = 0;
      skp = 0;
      imove();
      break;
    default:
      break;
  }
  dis = robot.port(4); // 超声波
  // 保持距离
  if (dis >= 0 && dis <= 5) {
    beep(1864, 0.1, 100, 1); // hz, s, db, type
    showEye(Up);
    dspd = -60;
    sspd = 0;
    dkp = 0;
    skp = 1;
    imove();
  } else if (dis > 5 && dis <= 10) {
    while (getTimer(1) < 1) {
      move();
    }
  }
}
