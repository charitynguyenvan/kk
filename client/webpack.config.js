module.exports = {
  entry: {
    "demo": './index.js',
    // "table": './index-table.js',
    // "upload": './index-upload.js'
  },
  "devtool": "eval",
  output: {
    path: __dirname + '/dist',
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ['es2015', {'modules': false}],
                'react'
              ],
              plugins: ["transform-object-rest-spread"]
            }
          }
        ]
      },
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
    ]
    // loaders: [
    //   {
    //     exclude: /(node_modules)/,
    //     loader: 'babel-loader',
    //     // query: {
    //     //   presets: ['es2015', 'react'],
    //     //   plugins: ["transform-object-rest-spread"]
    //     // }
    //   },
    //
    // ]
  },
  watch: true
}
