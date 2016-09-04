"use strict";
require('./style.scss');
const {fx, range} = require('fx/shim');

function isIterable(obj) {
  if (obj == null) { // checks for null and undefined
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

const input = document.querySelector('textarea');
const result = document.querySelector('.result');
const error = document.querySelector('.error');
const run = document.querySelector('#run');

run.addEventListener('click', function () {
  let code = input.value;
  let px = code.split('\n');

  if (px.length > 0) {
    px[px.length - 1] = `console.dump(${px[px.length - 1]});`;
    code = px.join('\n');
  }

  const output = [];
  const logger = {
    log(...args) {
      for (let v of args) {
        output.push(JSON.stringify(v));
      }
    },
    dump(arg) {
      if (isIterable(arg)) {
        this.log([...arg]);
      } else {
        this.log(arg);
      }
    }
  };

  try {
    code = Babel.transform(code, {presets: ['es2015']}).code;
    new Function('fx', 'range', 'console', code)(fx, range, logger);
  } catch (e) {
    error.textContent = e.toString();
    return;
  }

  error.textContent = '';
  result.textContent = output;
});