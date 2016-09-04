"use strict";
import { Chain } from './chain';

/**
 * @param {Number} start
 * @param {Number} end
 * @param {Number} step
 * @returns {Chain}
 */
export function range(start = 0, end = Infinity, step = 1) {
  const iterator = (function*() {
    for (let i = start; i < end; i += step) {
      yield i;
    }
  })();
  return new Chain(iterator);
}
