import test from 'ava';
import {range} from '../fx';

test('drop while', t => {
  t.deepEqual(
    range(1, 20).dropWhile(x => x % 5 != 0).toArray(),
    [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  );
});
