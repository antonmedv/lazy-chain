import test from 'ava';
import {fx} from '../fx';

test('', t => {
  t.deepEqual(
    fx([1, 2, 3]).reverse().toArray(),
    [3, 2, 1]
  );
});
