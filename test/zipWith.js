import test from 'ava';
import {fx} from '../fx';

test('zipWith 2 arrays', t => {
  t.deepEqual(
    fx([[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]).zipWith((x, y) => x * y).toArray(),
    [1, 4, 9, 16, 25]
  );
});

test('zipWith 3 arrays', t => {
  t.deepEqual(
    fx([[1, 2, 3], [1, 2, 3], [1, 2, 3]]).zipWith((x, y, z) => x + y + z).toArray(),
    [3, 6, 9]
  );
});
