"use strict";
import { Chain } from './chain';
export { range } from './range';

/**
 * @param iterator
 * @returns {Chain}
 */
export function fx(iterator) {
  return new Chain(iterator);
}
