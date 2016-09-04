"use strict";

export class Chain {
  /**
   * @param {Iterable} iterator
   */
  constructor(iterator) {
    this.iterator = function*() {
      yield* iterator;
    }();
  }

  /**
   * @param {Function|Generator} fn
   * @returns {Chain}
   */
  apply(fn) {
    this.iterator = fn(this.iterator);
    return this;
  }

  /**
   * @param {Generator[]} fns
   * @returns {Chain}
   */
  compose(...fns) {
    for (let fn of fns) {
      this.iterator = fn(this.iterator);
    }
    return this;
  }

  /**
   * @param {Number} n
   * @returns {Chain}
   */
  chunk(n) {
    let i = 0;
    let acc = [];
    return this.apply(function*(iterator) {
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
    });
  }

  drop(n = 1) {
    let i = 0;
    return this.apply(function *(iterator) {
      for (let value of iterator) {
        if (i++ >= n) {
          yield value;
        }
      }
    });
  }

  /**
   * @param {Function} fn
   * @returns {Chain}
   */
  filter(fn) {
    return this.apply(function*(iterator) {
      for (let value of iterator) {
        if (fn(value)) {
          yield value;
        }
      }
    });
  }

  /**
   * @returns {*}
   */
  head() {
    return this.iterator.next().value;
  }

  /**
   * @returns {Chain}
   */
  tail() {
    return this.drop(1);
  }

  /**
   * @param {Function} fn
   * @returns {Chain}
   */
  map(fn) {
    return this.apply(function*(iterator) {
      for (let value of iterator) {
        yield fn(value);
      }
    });
  }

  /**
   * @param {Number} count
   * @returns {Chain}
   */
  take(count) {
    return this.apply(function*(iterator) {
      let i = 0;
      for (let value of iterator) {
        if (i++ < count) {
          yield value;
        } else {
          return;
        }
      }
    });
  }

  /**
   * @returns {Chain}
   */
  reverse() {
    return this.apply(function*(iterator) {
      yield* [...iterator].reverse();
    });
  }

  /**
   * @param {Function} fn
   * @returns {Chain}
   */
  sort(fn = null) {
    return this.apply(function*(iterator) {
      yield* [...iterator].sort(fn);
    });
  }

  /**
   * @returns {Chain}
   */
  zip() {
    return this.apply(function*(iterator) {
      const values = [...iterator];
      const length = Math.max(...values.map(x => x.length));

      for (let i = 0; i < length; i++) {
        yield values
          .map(x => x[i])
          .filter(x => x !== undefined && x !== null);
      }
    })
  }

  /**
   * @returns {Iterable}
   */
  [Symbol.iterator]() {
    return this.iterator;
  }

  /**
   * @param {Function} fn
   */
  forEach(fn) {
    for (let value of this.iterator) {
      fn(value);
    }
  }

  /**
   * @returns {Array}
   */
  toArray() {
    const array = [];

    for (let value of this.iterator) {
      array.push(value);
    }

    return array;
  }
}
