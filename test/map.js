import test from 'ava';
import {fx} from '../fx';

test('map fn on items', t => {
  t.deepEqual(
    fx([1, 2, 3]).map(x=>x * 2).toArray(),
    [2, 4, 6]
  );
});
