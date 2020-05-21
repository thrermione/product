const _ = require('underscore');

const getRandomRating = (min, max) => {
  const base = _.random(max);
  const biasedRandomDecimal = [0, 0, 0, 0.25, 0.5, 0.75][_.random(5)];
  const rating = base - biasedRandomDecimal;
  return Math.floor(rating) <= 0 ? 0 : rating;
};
const getRandomPrice = (min, max) => _.random(min, max) - 0.01;

const getRandomBoolean = () => [true, false][_.random(1)];

const getRandomInt = (min, max) => _.random(min, max);

module.exports = {
  getRandomRating,
  getRandomPrice,
  getRandomBoolean,
  getRandomInt,
};
