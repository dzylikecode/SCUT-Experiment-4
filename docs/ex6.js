function main() {
  wait(1);
  dspd = 30;
  sspd = 0;
  wait(4);
  dspd = 0;
  sspd = 0;
  dkp = 0;
  skp = 0;
  imove();
  while (1) {
    move();
  }
  return;
  function imove() {
    msum0 = msum;
    msub0 = msub;
    dpsd0 = dspd;
    sspd0 = sspd;
    dep = 0;
    sep = 0;
  }
  function move() {
    dep = msum - msum0;
    dspd = dkp * dep * -1 + dspd0;
    sep = msub - msub0;
    sspd = skp * sep * -1 + sspd0;
  }
}
