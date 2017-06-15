const nodeExternals = require('webpack-node-externals')
module.exports = {
  entry: {
    'es6': './lambda.js'
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    library: '', libraryTarget: 'commonjs'
  },
  target: 'node',
  externals: [nodeExternals()]
}
