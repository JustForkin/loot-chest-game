function devConfig(){
    const path = require("path");
    const webpack = require("webpack");
    const WebpackNotifierPlugin = require("webpack-notifier");

    const srcDir = path.join(process.cwd(), "src");
    const distDir = path.join(process.cwd(), "dist");
    const distJsDir = path.join(distDir, "js");

    /// PLUGINS ///

    const plugins = [
      // Growl notifications
      new WebpackNotifierPlugin(),
      new webpack.DefinePlugin({
        "proccess.env": {
          "NODE_ENV": '"dev"'
        }
      })
    ];

    /// MODULES (LOADERS) ///

    const modules = {
      preLoaders: [{
        // ESLint
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: [
          /node_modules/,
        ],
      }],

      loaders: [{
        // Babel
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
        ],
        loader: "babel",
      }],
    };

    /// CONFIG ///

  return {
    cache: true,
    debug: true,
    devtool: "eval",
    entry: {
      index: path.join(srcDir, "index")
    },
    output: {
      path: distJsDir,
      filename: `[name].bundle.js`,
      chunkFilename: "[id].bundle.js"
    },
    resolve: {
      extensions: ["", ".js"],
      root: [srcDir],
    },
    eslint: {
      emitError: true,
      emitWarning: true,
    },
    module: modules,
    plugins: plugins,
  };
  }

}
