import {Chain} from './chain';
export {range} from './range';
export {compose} from './compose';
export * from './func';

/**
 * @param params
 * @returns {Chain}
 */
export function fx(...params) {
  if (params.length === 1) {

    if (params[0] instanceof Chain) {
      return params[0];
    }

    return new Chain(params[0]);
  } else {
    return new Chain(params);
  }
}
