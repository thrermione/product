let lut1k = [];
let k = 0;
let lut10m = [];
let m = 0;

for( let i = 0; i < 10000; i += 1 ) {
  lut1k.push(Math.random()*10000|1);
};


const rand1k = function() {
  console.log(k);
  if( k === 1000 ) {
    k = 1;
  }
  return lut1k[++k];
};

for( let i = 0; i < 100000; i += 1 ) {
  lut10m.push(Math.random()*10000000|1);
};

const rand10m = function() {
  if( m === 100000 ) {
    m = 0;
  }
  return lut10m[++m];
};

module.exports = {
  rand1k,
  rand10m
}
