'use strict';
import { Chain } from './chain';
export { range } from './range';

/**
 * @param iterator
 * @returns {Chain}
 */
export default function xs(iterator) {
  return new Chain(iterator);
}
