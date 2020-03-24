const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devConfig = require('./webpack.dev.config')
const prodConfig = require('./webpack.prod.config')

const common = {
  entry: {
    pig: './src/pig.js',
    rabbit: './src/rabbit.js'
  },
  // output.filename will be merged from devConfig or prodConfig
  output: {
    path: path.resolve(__dirname, './dist'),
    // Where you uploaded your bundled files. (Relative to server root)
    publicPath: '/dist/'
  },
  // MiniCssExtractPlugin will be concatenated from devConfig or prodConfig
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    // }),
    new HtmlWebpackPlugin({
      title: 'Rabbit Page',
      filename: 'rabbit.html',
      // Allows you to add only 'rabbit' chunks
      // meaning it will only contains rabbit.js and rabbit.css
      chunks: ['rabbit', 'commons'],
      // Load a custom template
      template: './src/rabbit.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Pig Page',
      filename: 'pig.html',
      // Allows you to add only 'pig' chunks
      // meaning it will only contains pig.js and pig.css
      chunks: ['pig', 'commons'],
      // Load a custom template
      template: './src/pig.html'
    })
  ],
  // file-loader, css-loader and sass-loader will be concatenated from devConfig or prodConfig
  // please setup rules for me, how to load files other than Js files
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['transform-class-properties']
          }
        }
      }
    ]
  }
}

module.exports = env =>
  env.NODE_ENV === 'development'
    ? merge(common, devConfig)
    : merge(common, prodConfig)
