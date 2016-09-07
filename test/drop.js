import test from 'ava';
import {fx} from '../fx';

test('drop items', t => {
  t.deepEqual(
    fx([1, 2, 3, 4, 5, 6]).drop().toArray(),
    [2, 3, 4, 5, 6]
  );

  t.deepEqual(
    fx([1, 2, 3, 4, 5, 6]).drop(2).toArray(),
    [3, 4, 5, 6]
  );

  t.deepEqual(
    fx([1, 2, 3, 4, 5, 6]).drop(7).toArray(),
    []
  );

  t.deepEqual(
    fx([1, 2, 3, 4, 5, 6]).tail().toArray(),
    [2, 3, 4, 5, 6]
  );
});
