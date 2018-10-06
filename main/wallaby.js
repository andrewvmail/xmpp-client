module.exports = function (wallaby) {
  return {
    files: [
      'app/**/*.js',
      '!app/**/*.spec.js'
    ],
    tests: [
      'app/**/*.spec.js',
      'test/**/*.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babelrc: true,
        presets: ['@ava/babel-preset-stage-4', ]
      })
    },
    testFramework: 'ava',
    debug: true
  };
};