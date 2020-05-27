let lut1k = [];
let lut10k = [];
let lut10m = [];
let i1k = 0;
let i10k = 0;
let i10m = 0;

for( let i = 0; i < 10001; i += 1 ) {
  lut10k.push(Math.random()*10000|1);
};

for( let i = 0; i < 10001; i += 1 ) {
  lut1k.push(Math.random()*1000|1);
};

for( let i = 0; i < 100001; i += 1 ) {
  lut10m.push(Math.random()*10000000|1);
};

const rand1k = function() {
  if( i1k === 10000 ) {
    i1k = 1;
  }
  return lut1k[++i1k];
};

const rand10k = function() {
  if( i10k === 10000 ) {
    i10k = 1;
  }
  return lut10k[++i10k];
};

const rand10m = function() {
  if( i10m === 100000 ) {
    i10m = 0;
  }
  return lut10m[++m];
};

module.exports = {
  rand1k,
  rand10k,
  rand10m
}
