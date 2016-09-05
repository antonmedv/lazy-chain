"use strict";
import {
  chunk,
  drop,
  filter,
  map,
  tail,
  take,
  reverse,
  sort,
  zip
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
  filter(fn) {
    return this.apply(filter(fn));
  }

  /**
   * @returns {*}
   */
  head() {
    return this.iterator.next().value;
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
    return this.apply(zip)
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
