import test from 'ava';
import {range} from '../fx';

test('range infinity', t => {
  t.deepEqual(
    range().take(10).toArray(),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  );
});

test('range from start to end', t => {
  t.deepEqual(
    range(-5, 5).toArray(),
    [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
  );
});

test('range from start to end with step', t => {
  t.deepEqual(
    range(0, 10, 1).toArray(),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  );
});

test('range from start to end with not-equal steps', t => {
  t.deepEqual(
    range(0, 10, 3).toArray(),
    [0, 3, 6, 9]
  );
});