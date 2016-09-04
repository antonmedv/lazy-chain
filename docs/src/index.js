"use strict";
require('./style.scss');
require('codemirror/lib/codemirror.css');
//require('./spacegrey.scss');
require('codemirror/mode/javascript/javascript');
const CodeMirror = require('codemirror');
const {fx, range} = require('fx/shim');

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
    log(...args) {
      let line = [];

      for (let value of args) {
        line.push(isString(value) ? value : JSON.stringify(value));
      }

      let node = document.createElement('div');
      node.className = 'line';
      node.textContent = line.join('');
      outputNode.appendChild(node);
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
    let code = mirror.getValue();

    try {
      localStorage.setItem('repl_code', mirror.getValue());
    } catch (e) {
    }

    code = `const result = do {${code}};`;
    code = Babel.transform(code, {presets: ['es2015', 'stage-0']}).code;
    code = `
      ${code}
      return result;
    `;

    let output = new Function('fx', 'range', 'console', code)(fx, range, logger);

    logger.dump(output);
  } catch (e) {
    errorNode.textContent = e.toString();
    errorNode.style.display = 'block';
    return;
  }

  errorNode.style.display = 'none';
  errorNode.textContent = '';
});