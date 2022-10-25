// rectangle
function main() {
  wait(1);
  dspd = 0;
  sspd = 0;
  dkp = 0;
  skp = 0;
  imove();
  for (let i = 0; i < 4; i++) {
    es = 1500;
    dspd = 100;
    sspd = 0;
    dkp = 0;
    skp = 1;
    line();
    es = 250;
    dspd = 0;
    sspd = 60;
    dkp = 0;
    skp = 1;
    angle();
  }
  dspd = 0;
  sspd = 0;
  dkp = 0;
  skp = 1;
  imove();
  while (1) {
    move();
  }
  return;
  function line() {
    msum0 = msum + es;
    msub0 = msub;
    do {
      sep = msub0 - smub;
      sspd = skp * sep * -1;
      dep = msum - msum0;
    } while (dep < 0);
  }
  function angle() {
    msub0 = msub + es;
    msum0 = msum;
    do {
      dep = msum - msum0;
      dspd = dkp * dep * -1;
      sep = msub - msub0;
    } while (sep < 0);
  }
}
