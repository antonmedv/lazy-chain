import {fx, compose} from './index';

/**
 * @param {*} obj
 * @returns {Boolean}
 */
function isIterable(obj) {
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

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
 * @param {Iterator} iterator
 */
export const cycle = function*(iterator) {
  const cache = [];

  for (let value of iterator) {
    yield value;
    cache.push(value);
  }

  while (true) for (let value of cache) {
    yield value;
  }
};

/**
 * @param {Number} n
 * @returns {Generator}
 */
export const drop = (n = 1) => function*(iterator) {
  let i = 0;

  for (let value of iterator) {
    if (i++ >= n) {
      yield value;
    }
  }
};

/**
 * @param fn
 * @returns {Generator}
 */
export const dropWhile = (fn) => function*(iterator) {
  let dropped = false;

  for (let value of iterator) {
    if(!dropped) {
      if (!fn(value)) {
        dropped = true;
      }
    } else {
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
 * @param {Iterator} iterator
 */
export const flatten = function*(iterator) {
  for (let value of iterator) {
    if (typeof value !== "string" && isIterable(value)) {
      yield* fx(value).flatten();
    } else {
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
 * @returns {Generator}
 */
export const reverse = function*(iterator) {
  yield* [...iterator].reverse();
};

/**
 * @param {Function} fn
 * @returns {Generator}
 */
export const sort = (fn = null) => function*(iterator) {
  yield* [...iterator].sort(fn);
};


/**
 * @returns {Generator}
 */
export const zip = function*(iterator) {
  const channels = [...iterator].map(x => fx(x));

  while (true) {
    let zipped = [];

    for (let ch of channels) {
      let {value, done} = ch.next();

      if (done) {
        return;
      } else {
        zipped.push(value)
      }
    }

    yield zipped;
  }
};

/**
 *
 * @param fn
 */
export const zipWith = (fn) => compose(
  zip,
  map(x => fn(...x))
);
