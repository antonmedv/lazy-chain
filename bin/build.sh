#!/usr/bin/env bash

# Build ES6 package
rollup src/index.js --output fx.js --format cjs

# Build shim version
rollup src/shim.js --output shim.js --format cjs &&
babel shim.js -o shim.js &&
webpack shim.js shim.js --output-library-target umd &&
uglifyjs --output shim.js --compress --mangle --screw-ie8 -- shim.js
