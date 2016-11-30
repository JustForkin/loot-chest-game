function devConfig () {
  const path = require('path');
  const webpack = require('webpack');
  const WebpackNotifierPlugin = require('webpack-notifier');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  // USEFUL PATHS //
  const srcDir = path.join(process.cwd(), 'src');
  const distDir = path.join(process.cwd(), 'dist');
  const distJsDir = path.join(distDir, 'js');
  const phaserModule = path.join(process.cwd(), 'node_modules/phaser/');
  const phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');

  // PLUGINS //

  const plugins = [
    // Growl notifications
    new WebpackNotifierPlugin(),
    //dev settings
    new webpack.DefinePlugin({
      'proccess.env': {
        'NODE_ENV': '"dev"',
      }
    }),
    //css extractor
    new ExtractTextPlugin('../css/main.css')
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
        // SASS
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
            'style', // backup loader when not building .css file
            'css!sass' // loaders to preprocess CSS
        )
      }
    ]
  }

  // CONFIG //

  return {
    debug: true,
    //devtool: 'sourceMap',
    entry: {
      game:"./src/game.js"
    },
    output: {
      path: path.join(distDir,'js/'),
      publicPath: "js/",
      filename: `[name].bundle.js`,
      chunkFilename: '[name].[id].bundle.js'
    },
    resolve: {
      extensions: ['', '.js'],
      root: [
            path.resolve('./node_modules'),
            path.resolve('./src')
            ],
      modulesDirectories: ["src","node_modules"],
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
