const path = require('path')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devConfig = require('./webpack.dev.config')
const prodConfig = require('./webpack.prod.config')

const common = {
  entry: './src/index.js',
  // output.filename will be merged from devConfig or prodConfig
  output: {
    path: path.resolve(__dirname, './dist'),
    // Where you uploaded your bundled files. (Relative to server root)
    publicPath: '/dist/'
  },
  // MiniCssExtractPlugin will be concatenated from devConfig or prodConfig
  plugins: [
    new CleanWebpackPlugin({
      // all the file patterns you want to remove
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'dist/**/*')
      ]
    }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    // }),
    new HtmlWebpackPlugin({
      // Load a custom template
      template: './src/index.html'
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
