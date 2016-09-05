"use strict";

/**
 * @param {Generator} fn
 * @returns {Generator}
 */
export function compose(...fn) {
  return function*(iterator) {
    for (let f of fn) {
      iterator = f(iterator);
    }
    yield* iterator;
  }
}
