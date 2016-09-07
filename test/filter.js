import test from 'ava';
import {fx} from '../fx';

test('filter items', t => {
  t.deepEqual(
    fx([1, 2, 3, 4, 5, 6]).filter(x => x % 2 == 0).toArray(),
    [2, 4, 6]
  );

  t.deepEqual(
    fx([1, 2, 3, 4, 5, 6]).filter(x => false).toArray(),
    []
  );
});
