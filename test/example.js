import test from 'ava';
import {fx} from '../fx';

test('', t => {
  t.deepEqual(
    fx([]).toArray(),
    []
  );
});
