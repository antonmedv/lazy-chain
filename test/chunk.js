import test from 'ava';
import {fx} from '../fx';

test('chunk items into tuples', t => {
  t.deepEqual(
    fx([1, 2, 3, 4, 5, 6]).chunk(2).toArray(),
    [[1, 2], [3, 4], [5, 6]]
  );

  t.deepEqual(
    fx([1, 2, 3, 4, 5]).chunk(2).toArray(),
    [[1, 2], [3, 4], [5]]
  );
});
