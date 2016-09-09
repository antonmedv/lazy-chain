import test from 'ava';
import {fx} from '../fx';

test('cycle array', t => {
  t.deepEqual(
    fx([1, 2, 3]).cycle().take(10).toArray(),
    [1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
  );
});

test('cycle one', t => {
  t.deepEqual(
    fx([1]).cycle().take(3).toArray(),
    [1, 1, 1]
  );
});
