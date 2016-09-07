import test from 'ava';
import {fx, compose, filter, take, map} from '../fx';

test('compose func', t => {
  let trans = compose(
    filter(x => x % 2 == 0),
    map(x => x * x),
    take(3)
  );

  t.deepEqual(
    [...trans([1, 2, 3, 4, 5, 6, 7])],
    [ 4, 16, 36 ]
  );

  t.deepEqual(
    fx([1, 2, 3, 4, 5, 6, 7]).apply(trans).toArray(),
    [ 4, 16, 36 ]
  );
});
