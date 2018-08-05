const path = require('path');
const webpack = require('webpack')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');




module.exports = {
  module: {
    rules: [{
      include: [path.resolve(__dirname, 'js')],
      loader: 'babel-loader',

      options: {
        plugins: ['syntax-dynamic-import'],

        presets: [
          ['env', {
            'modules': false
          }]
        ]
      },

      test: /\.js$/
    },
      {
        test: /\.s?[ac]ss$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'bundle.css',
            outputPath: 'dist/'
          }
        }, {
          loader: 'style-loader'
        }, {
          loader: 'extract-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      }, {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '../'
          }
        }]
      }]
  },


  entry: ['./js/main.mjs', './css/style.css'],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  mode: 'development',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
}

/* module.exports = {
  mode: 'development',

  entry: './js/main.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
 */