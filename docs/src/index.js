"use strict";
require('./style.scss');
require('codemirror/lib/codemirror.css');
//require('./spacegrey.scss');
require('codemirror/mode/javascript/javascript');
const CodeMirror = require('codemirror');
const Fx = require('fx/shim');
const {fx, range} = Fx;

function isIterable(obj) {
  if (obj == null) { // checks for null and undefined
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

const inputNode = document.querySelector('.input');
const outputNode = document.querySelector('.output');
const errorNode = document.querySelector('.error');
const runNode = document.querySelector('#run');

const mirror = CodeMirror(inputNode, {
  lineNumbers: true,
  mode: 'javascript',
  theme: 'default',
  tabSize: 2
});

try {
  mirror.setValue(localStorage.getItem('repl_code'));
} catch (e) {
}

runNode.addEventListener('click', function (event) {
  event.preventDefault();
  outputNode.textContent = '';

  const logger = {
    log() {
      let args = Array.prototype.slice.call(arguments);
      let line = [];

      args.forEach(value => {
        line.push(isString(value) ? value : JSON.stringify(value));
      });

      let node = document.createElement('div');
      node.className = 'line';
      node.textContent = line.join(String.fromCharCode(8201));
      outputNode.appendChild(node);
    },
    dump(arg) {
      if (isIterable(arg)) {
        this.log(fx(arg).toArray());
      } else {
        this.log(arg);
      }
    }
  };

  const require = (name) => {
    if (name == 'fx') {
      return Fx;
    } else {
      throw new Error(`Unknown module "${name}". Try to require "fx".`);
    }
  };

  try {
    let code = mirror.getValue();

    try {
      localStorage.setItem('repl_code', mirror.getValue());
    } catch (e) {}

    code = `const result = do {${code}
    };`;
    code = Babel.transform(code, {presets: ['es2015', 'stage-0']}).code;
    code = `
      ${code}
      return result;
    `;

    let output = new Function('fx', 'range', 'console', 'require', code)(fx, range, logger, require);

    logger.dump(output);
  } catch (e) {
    errorNode.textContent = e.toString();
    errorNode.style.display = 'block';
    return;
  }

  errorNode.style.display = 'none';
  errorNode.textContent = '';
});