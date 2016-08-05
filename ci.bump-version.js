/* eslint strict: "off" */
'use strict';

if (process.env.TRAVIS !== 'true') {
  process.exit(1);
}

if (process.env.TRAVIS_BRANCH !== 'develop') {
  process.exit(0);
}

const execSync = require('child_process').execSync;
const version = require('./package.json').version;
let newVersion = version.match(/^\d+.\d+.\d+/)[0];
newVersion = `${newVersion}-${process.env.TRAVIS_BRANCH}.${process.env.TRAVIS_BUILD_NUMBER}`;
execSync(`npm version ${newVersion}`);
