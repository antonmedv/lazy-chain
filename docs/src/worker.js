const Fx = require('fx/shim');
const {fx, range} = Fx;

const logger = {
  log() {
    let args = Array.prototype.slice.call(arguments);
    let line = [];

    args.forEach(value => {
      line.push(isString(value) ? value : JSON.stringify(value));
    });

    postMessage({
      type: 'log',
      output: line.join(String.fromCharCode(8201))
    });
  },

  dump(arg) {
    if (isIterable(arg)) {
      this.log(fx(arg).toArray());
    } else {
      this.log(arg);
    }
  }
};

const requirer = (name) => {
  if (name == 'fx') {
    return Fx;
  } else {
    throw new Error(`Unknown module "${name}". Try to require "fx".`);
  }
};

function isIterable(obj) {
  if (obj == null) { // checks for null and undefined
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

onmessage = (e) => {
  let code = e.data;

  let output = new Function('fx', 'range', 'console', 'require', code)(fx, range, logger, requirer);
  logger.dump(output);

  postMessage({type: 'end'});
};
