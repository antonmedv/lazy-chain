'use strict';
import { fx, range, filter } from '../src/index';

const multiplyBy = n => function*(iterator) {
  for (let value of iterator) {
    yield n * value;
  }
};

const negate = function* (iterator) {
  for (let value of iterator) {
    yield -value;
  }
};

const log = (name) => function* (iterator) {
  for (let value of iterator) {
    console.log(name, '>', value);
    yield value;
  }
  console.log('---');
};


for (let i of fx([1, 2, 3, 4]).filter(x => x > 2)) {
  console.log(i);
}

console.log(
  ...range()
    .apply(log('range'))
    .filter(x => x > 5)
    .apply(log('filter'))
    .map(x => x * 2)
    .apply(log('map'))
    .take(20)
    .apply(log('take'))
    .compose(
      negate,
      negate
    )
    .apply(log('compose'))
    .chunk(2)
    .apply(log('chunk'))
    .zip()
    .apply(log('zip'))
);
