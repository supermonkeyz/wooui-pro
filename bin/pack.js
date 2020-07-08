#!/usr/bin/env node
const execSync = require('child_process').execSync;
const components = require('../components/components.json');

execSync(
  'vue-cli-service build --target lib --name wooui ./components/index.js --dest ./lib/'
);

Object.keys(components).forEach(pack => {
  pack = pack.toLowerCase();
  if (pack.indexOf('...') === 0) {
    pack = pack.replace('...', '');
  }
  execSync(
    `vue-cli-service build --target lib --name index ./components/${pack}/index.js --dest ./lib/${pack}`
  );
});
