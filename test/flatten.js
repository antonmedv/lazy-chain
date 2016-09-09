import test from 'ava';
import {fx} from '../fx';

test('flatten deep', t => {
  t.deepEqual(
    fx([1, [2, 3], [[4, 5], [6], 7]]).flatten().toArray(),
    [1, 2, 3, 4, 5, 6, 7]
  );
});

test('flatten with strings', t => {
  t.deepEqual(
    fx([1, [[2, 3], "str"]]).flatten().toArray(),
    [1, 2, 3, "str"]
  );
});
