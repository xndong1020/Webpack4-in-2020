const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  // env is the webpack cli options, like 'webpack --env.NODE_ENV production'
  const devMode = env.NODE_ENV !== 'production'
  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.[contenthash].js',
      path: path.resolve(__dirname, './dist'),
      // Where you uploaded your bundled files. (Relative to server root)
      publicPath: '/dist/'
    },
    // mode: env.NODE_ENV,
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
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: devMode ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css'
      })
    ],
    // for minification
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({ sourceMap: true })]
    },
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
        },
        // if see .png or .jp(e)g, gif files, use 'file-loader'
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name(resourcePath, resourceQuery) {
              // `resourcePath` - `/absolute/path/to/file.js`
              // `resourceQuery` - `?foo=bar`

              if (process.env.NODE_ENV === 'development') {
                return '[path][name].[ext]'
              }

              return '[contenthash].[ext]'
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development'
              }
            },
            'css-loader'
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development'
              }
            },
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader'
          ]
        }
      ]
    }
  }
}
