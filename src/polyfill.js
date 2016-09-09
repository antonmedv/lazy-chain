// Polyfills for shim version of Fx.
(function () {
  var global = new Function('return this')();
  if (typeof global.Symbol !== 'function') {
    var Symbol = Object.create(null);
    Object.defineProperty(Symbol, 'iterator', {
      value: '@@iterator'
    });
    Object.defineProperty(global, 'Symbol', {
      value: Symbol,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
})();
