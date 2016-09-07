import test from 'ava';
import {fx, range} from '../fx';

test('take n items', t => {
  t.deepEqual(
    fx([1, 2, 3, 4, 5, 6]).take(3).toArray(),
    [1, 2, 3]
  );
});

test('take n items from infinity', t => {
  t.deepEqual(
    range().take(6).toArray(),
    [0, 1, 2, 3, 4, 5]
  );
});

test('take 0 items', t => {
  t.deepEqual(
    range().take(0).toArray(),
    []
  );
});