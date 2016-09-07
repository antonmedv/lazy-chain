import test from 'ava';
import {fx, range} from '../fx';

test('fx takes array', t => {
  t.deepEqual(
    fx([1, 2, 3]).toArray(),
    [1, 2, 3]
  );
});

test('fx takes empty array', t => {
  t.deepEqual(
    fx([]).toArray(),
    []
  );
});

test('fx takes params as array', t => {
  t.deepEqual(
    fx(1, 2, 3).toArray(),
    [1, 2, 3]
  );
});

test('fx takes iterator', t => {
  function *gen() {
    yield 1;
    yield 2;
    yield 3;
  }

  t.deepEqual(
    fx(gen()).toArray(),
    [1, 2, 3]
  );
});

test('fx takes another fx', t => {
  let x = fx([1, 2, 3]);

  t.deepEqual(
    fx(x).toArray(),
    [1, 2, 3]
  );
});
