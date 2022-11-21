function main() {
  wait(1);
  dspd = 100;
  kp = 20;
  ep = 0;
  es = 15;
  while (1) {
    ep = robot.color - es;
    sspd = kp * ep;
    wait(0.01);
  }
}
