import test from 'ava';
import {fx} from '../fx';

test('sort items', t => {
  t.deepEqual(
    fx([6, 3, 5, 7, 4, 5, 2]).sort((a, b) => a - b).toArray(),
    [2, 3, 4, 5, 5, 6, 7]
  );
});
