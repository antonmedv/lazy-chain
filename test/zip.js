import test from 'ava';
import {fx} from '../fx';

test('zip 2 arrays', t => {
  t.deepEqual(
    fx([[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]).zip().toArray(),
    [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]
  );
});

test('zip 3 arrays', t => {
  t.deepEqual(
    fx([[1, 2, 3], [1, 2, 3], [1, 2, 3]]).zip().toArray(),
    [[1, 1, 1], [2, 2, 2], [3, 3, 3]]
  );
});

test('zip n arrays', t => {
  t.deepEqual(
    fx([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]).zip().toArray(),
    [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
  );
});

test('zip not equal size arrays', t => {
  t.deepEqual(
    fx([['a', 'b', 'c', 'd', 'f'], [1, 2, 3]]).zip().toArray(),
    [["a", 1], ["b", 2], ["c", 3]]
  );
});

test('zip two fx', t => {
  t.deepEqual(
    fx(fx(1, 2, 3, 4), fx(9, 8, 7, 6)).zip().toArray(),
    [[1, 9], [2, 8], [3, 7], [4, 6]]
  );
});

test('zip fx and array', t => {
  t.deepEqual(
    fx(fx(1, 2, 3, 4), [9, 8, 7, 6]).zip().toArray(),
    [[1, 9], [2, 8], [3, 7], [4, 6]]
  );
});