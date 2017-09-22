var webpack = require('webpack');
var WebpackShellPlugin = require('webpack-shell-plugin');


var config = {
  entry: './all-tests.js',
  output: {
    filename: 'testBundle.js'
  },
  

  plugins: [
    new WebpackShellPlugin({
      onBuildExit: "mocha --colors --require testBundle.js"
    })
  ]
};


module.exports = config;