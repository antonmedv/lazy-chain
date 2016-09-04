"use strict";
const fx = require('fx/shim').fx;
const range = require('fx/shim').range;

for (let i of range(1).tail().filter(x => x % 137 == 0).take(10)) {
  console.log(i);
}
