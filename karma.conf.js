/* eslint import/no-dynamic-require: "off" */

const path = require('path');

process.env.NODE_ENV = 'test';

module.exports = (config) => {
  const settings = {
    basePath: process.cwd(),
    frameworks: ['mocha'],
    files: ['test.webpack.js'],
    exclude: [],
    preprocessors: {
      'test.webpack.js': ['webpack', 'sourcemap'],
    },
    webpack: require(path.join(__dirname, 'webpack.test.js')),
    webpackServer: {
      noInfo: true,
    },
    webpackMiddleware: {
      noInfo: true,
    },
    reporters: ['mocha', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['clover', 'lcovonly', 'html', 'text-summary'],
      dir: './coverage',
      'report-config': {
        html: {
          subdir: 'html',
        },
      },
    },
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: 1,
    browsers: ['Chrome', 'Firefox'],
  };

  config.set(settings);
};
