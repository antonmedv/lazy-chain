import 'regenerator-runtime/runtime';

if (typeof Symbol !== 'function') {
  const Symbol = Object.create(null);
  Object.defineProperty(Symbol, 'iterator', {
    value: '@@iterator'
  });
  Object.defineProperty(new Function('return this')(), 'Symbol', {
    value: Symbol,
    configurable: true,
    enumerable: false,
    writable: true
  })
}

export * from './index';


