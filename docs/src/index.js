"use strict";
require('./style.scss');
require('codemirror/lib/codemirror.css');
const {fx, range} = require('fx/shim');
const CodeMirror = require('codemirror');

function isIterable(obj) {
  if (obj == null) { // checks for null and undefined
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

const inputNode = document.querySelector('.input');
const outputNode = document.querySelector('.output');
const errorNode = document.querySelector('.error');
const runNode = document.querySelector('#run');

const mirror = CodeMirror(inputNode, {
  lineNumbers: true,
  mode: 'javascript',
  tabSize: 2
});

runNode.addEventListener('click', function (event) {
  event.preventDefault();

  const log = [];
  const logger = {
    log(...args) {
      for (let v of args) {
        log.push(JSON.stringify(v));
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
    let code = mirror.getValue();

    code = `
      const result = do {
        ${code}
      };
    `;
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

  outputNode.textContent = '';
  for (let line of log) {
    let node = document.createElement('div');
    node.className = 'line';
    node.textContent = line;
    outputNode.appendChild(node);
  }
});