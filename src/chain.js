import {
  chunk,
  cycle,
  drop,
  dropWhile,
  filter,
  flatten,
  map,
  tail,
  take,
  reverse,
  sort,
  zip,
  zipWith
} from './func';

/**
 * @method {Chain} top
 */
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
   * @returns {Iterable}
   */
  [Symbol.iterator]() {
    return this.iterator;
  }

  /**
   * @returns {*}
   */
  next() {
    return this.iterator.next();
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

  /**
   * @returns {*}
   */
  head() {
    return this.iterator.next().value;
  }

  /**
   * @returns {Number}
   */
  get length() {
    return [...this].length;
  }

  /**************************************
   *        Chainable methods           *
   **************************************/

  /**
   * @param {Function|Generator} fn
   * @returns {Chain}
   */
  apply(fn) {
    this.iterator = fn(this.iterator);
    return this;
  }

  /**
   * @param {Generator} fn
   * @returns {Chain}
   */
  compose(...fn) {
    for (let f of fn) {
      this.iterator = f(this.iterator);
    }
    return this;
  }

  /**
   * @param {Number} n
   * @returns {Chain}
   */
  chunk(n) {
    return this.apply(chunk(n));
  }

  /**
   * @returns {Chain}
   */
  cycle() {
    return this.apply(cycle);
  }

  /**
   * @param {Number} n
   * @returns {Chain}
   */
  drop(n = 1) {
    return this.apply(drop(n));
  }

  /**
   * @param {Function} fn
   * @returns {Chain}
   */
  dropWhile(fn) {
    return this.apply(dropWhile(fn));
  }

  /**
   * @param {Function} fn
   * @returns {Chain}
   */
  filter(fn) {
    return this.apply(filter(fn));
  }

  /**
   * @returns {Chain}
   */
  flatten() {
    return this.apply(flatten);
  }

  /**
   * @param {Function} fn
   * @returns {Chain}
   */
  map(fn) {
    return this.apply(map(fn));
  }

  /**
   * @returns {Chain}
   */
  tail() {
    return this.apply(tail);
  }

  /**
   * @param {Number} count
   * @returns {Chain}
   */
  take(count) {
    return this.apply(take(count));
  }

  /**
   * @returns {Chain}
   */
  reverse() {
    return this.apply(reverse);
  }

  /**
   * @param {Function} fn
   * @returns {Chain}
   */
  sort(fn = null) {
    return this.apply(sort(fn));
  }

  /**
   * @returns {Chain}
   */
  zip() {
    return this.apply(zip);
  }

  /**
   * @param {Function} fn
   * @returns {Chain}
   */
  zipWith(fn) {
    return this.apply(zipWith(fn));
  }
}
