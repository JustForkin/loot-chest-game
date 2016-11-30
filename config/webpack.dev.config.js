function devConfig () {
  const path = require('path')
  const webpack = require('webpack')
  const WebpackNotifierPlugin = require('webpack-notifier')

  const srcDir = path.join(process.cwd(), 'src')
  const distDir = path.join(process.cwd(), 'dist')
  const distJsDir = path.join(distDir, 'js')
  const phaserModule = '../node_modules/phaser/';
  const phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');

  // PLUGINS //

  const plugins = [
    // Growl notifications
    new WebpackNotifierPlugin(),
    // new webpack.DefinePlugin({
    //   'proccess.env': {
    //     'NODE_ENV': '"dev"',
    //   }
    // }),
    // new webpack.ContextReplacementPlugin(
    //   /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    //   __dirname
    // )
  ]

  // MODULES (LOADERS) //

  const modules = {
     preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "eslint-loader?{rules:{semi:0}}",
        exclude: /node_modules/
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
      },
      {
        //SASS
        test: /\.scss$/,
        loader: 'sass-loader?sourceMap',
        exclude: /node_modules/
      }
    ]
  }

  // CONFIG //

  return {
    debug: true,
    //devtool: 'sourceMap',
    entry: {
      app:"./app.js",
      game:"./src/index.js"
    },
    output: {
      path: path.join(distDir,'js/'),
      filename: `[name].bundle.js`,
      chunkFilename: '[id].bundle.js'
    },
    resolve: {
      extensions: ['', '.js'],
      root: [
            path.resolve('./node_modules'),
            ],
      alias:{
        'phaser':phaser,
        'pixi.js':pixi,
        'p2': p2,
      }
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
