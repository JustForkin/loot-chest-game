function devConfig () {
  const path = require('path')
  const webpack = require('webpack')
  const WebpackNotifierPlugin = require('webpack-notifier')

  const srcDir = path.join(process.cwd(), 'src')
  const distDir = path.join(process.cwd(), 'dist')
  const distJsDir = path.join(distDir, 'js')

  // PLUGINS //

  const plugins = [
    // Growl notifications
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      'proccess.env': {
        'NODE_ENV': '"dev"'
      }
    })
  ]

  // MODULES (LOADERS) //

  const modules = {
     preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "eslint-loader?{rules:{semi:0}}",
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        // Babel
        test: /\.jsx?$/,
        exclude: [
          /node_modules/
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }

  // CONFIG //

  return {
    debug: true,
    devtool: 'eval',
    entry: {
      index: path.join(srcDir, 'index')
    },
    output: {
      path: distDir,
      publicPath: 'js/',
      filename: `bundle.js`,
      chunkFilename: '[id].bundle.js'
    },
    resolve: {
      extensions: ['', '.js'],
      root: [srcDir]
    },
    eslint: {
      emitError: true,
      emitWarning: true
    },
    module: modules,
    plugins: plugins
  };
}

module.exports = devConfig();
