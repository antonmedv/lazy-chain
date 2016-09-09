"use strict";
require('./style.scss');
require('codemirror/lib/codemirror.css');
//require('./spacegrey.scss');
require('codemirror/mode/javascript/javascript');
const CodeMirror = require('codemirror');

const inputNode = document.querySelector('.input');
const outputNode = document.querySelector('.output');
const errorNode = document.querySelector('.error');
const runNode = document.querySelector('#run');

function log(value) {
  let node = document.createElement('div');
  node.className = 'line';
  node.textContent = value;
  outputNode.appendChild(node);
}

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

let timeout;
runNode.addEventListener('click', function (event) {
  event.preventDefault();
  outputNode.textContent = '';

  try {
    let code = mirror.getValue();

    try {
      localStorage.setItem('repl_code', mirror.getValue());
    } catch (e) {
    }

    code = `const result = do {${code}
    };`;
    code = Babel.transform(code, {presets: ['es2015', 'stage-0']}).code;
    code = `
      ${code}
      return result;
    `;

    let worker = new Worker('worker.js');
    worker.postMessage(code);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      worker.terminate();
      showError('Timeout. Be careful with infinite sequences.');
    }, 3000);

    worker.addEventListener('message', (e) => {
      let {type, output} = e.data;

      if (type == 'end') {
        clearTimeout(timeout);
        worker.terminate();
      } else {
        log(output);
      }
    });

    worker.addEventListener('error', (e) => {
      clearTimeout(timeout);
      worker.terminate();
      showError(e.message);
    });
  } catch (e) {
    showError(e);
    return;
  }

  hideError();
});

function showError(e) {
  errorNode.textContent = e.toString();
  errorNode.style.display = 'block';
}

function hideError() {
  errorNode.style.display = 'none';
  errorNode.textContent = '';
}
