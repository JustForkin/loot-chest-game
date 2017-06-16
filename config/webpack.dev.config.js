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
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader', // backup loader when not building .css file
            use: 'css-loader!sass-loader' // loaders to preprocess CSS
      })
      }
    ]
  }

  // CONFIG //

  return {
    //debug: true,
    //devtool: 'sourceMap',
    entry: {
      index:"./src/index.js",
      game:['./src/game.js']
    },
    output: {
      path: path.join(distDir,'js/'),
      publicPath: "js/",
      filename: '[name].bundle.js',
      chunkFilename: '[id].bundle.js'
    },
    resolve: {
      extensions: ['.js'],
      alias: [
            path.resolve('./node_modules'),
            path.resolve('./src')
            ],
      modules: ["src","node_modules"],
      alias:{
        'phaser':phaser,
        'pixi.js':pixi,
        'p2': p2,
      }
    },
    module: modules,
    plugins: plugins
  };
}

module.exports = devConfig();
