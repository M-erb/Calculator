const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'development', // production|development
  entry: './app/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../public')
  },
  watch: false,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // "style-loader", // creates style nodes from JS strings
          MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS
        ]
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  'targets': {
                    'chrome': '60'
                  }
                }
              ]
            ]
          }
        }
      }, {
        test: /\.(png|svg|jpg|gif|ico)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'imgs/[name].[ext]'
          }
        }
      }, {
        test: /\.(json|xml|html)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.css'
      // chunkFilename: "[id].css"
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      parallel: true,
      sourceMap: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
}
