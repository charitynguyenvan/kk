module.exports = {
  entry: {
    'bundle': './index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    publicPath: '/dist/',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', {'modules': false}],
                'react'
              ],
              plugins: [
                'babel-plugin-root-import',
                'syntax-dynamic-import',
                'transform-object-rest-spread'
              ]
            }
          }
        ]
      },
      // {test: /\.css$/, loader: 'style-loader!css-loader'},
      // {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      // {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      // {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      // {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
    ]
  },
  'devtool': 'eval',
  watch: true
}
