/**
 * @param {Number} n
 * @returns {Generator}
 */
export const chunk = (n) => function*(iterator) {
  let i = 0;
  let acc = [];

  for (let value of iterator) {
    acc.push(value);
    if (++i >= n) {
      yield acc;
      acc = [];
      i = 0;
    }
  }

  if (acc.length > 0) {
    yield acc;
  }
};

/**
 * @param {Number} n
 * @returns {Generator}
 */
export const drop = (n = 1) => function *(iterator) {
  let i = 0;

  for (let value of iterator) {
    if (i++ >= n) {
      yield value;
    }
  }
};

/**
 * @param {Function} fn
 * @returns {Generator}
 */
export const filter = (fn) => function*(iterator) {
  for (let value of iterator) {
    if (fn(value)) {
      yield value;
    }
  }
};

/**
 * @param {Function} fn
 * @returns {Generator}
 */
export const map = (fn) => function*(iterator) {
  for (let value of iterator) {
    yield fn(value);
  }
};

/**
 * @type {Generator}
 */
export const tail = drop(1);

/**
 * @param {Number} count
 * @returns {Generator}
 */
export const take = (count) => function*(iterator) {
  let i = 0;
  for (let value of iterator) {
    if (i++ < count) {
      yield value;
    } else {
      return;
    }
  }
};

/**
 * @param {Iterable} iterator
 */
export function* reverse(iterator) {
  yield* [...iterator].reverse();
}

/**
 * @param {Function} fn
 * @returns {Generator}
 */
export const sort = (fn = null) => function*(iterator) {
  yield* [...iterator].sort(fn);
};


/**
 * @param {Iterable} iterator
 */
export function* zip(iterator) {
  const values = [...iterator];
  const length = Math.max(...values.map(x => x.length));

  for (let i = 0; i < length; i++) {
    yield values
      .map(x => x[i])
      .filter(x => x !== undefined && x !== null);
  }
}
