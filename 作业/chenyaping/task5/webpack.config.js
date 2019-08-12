const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack')

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html' ,
  filename: 'index.html',

})

const miniPlugin = new MiniCssExtractPlugin({
  // 产生到css目录下
  filename: 'css/main.css',
})
const optPlugin = new OptimizeCSSAssetsPlugin()
const webpackPlugin = new webpack.ProvidePlugin({
  $: 'jquery'
})
module.exports = {
  mode: "development", 
  entry: "./src/index.js", 
  output: {
    filename: "bundle.js", 
    path: path.resolve(__dirname, "dist") ,
  },
  plugins: [   
    htmlPlugin,
    miniPlugin,
    optPlugin,
  ],
  module: {   
    rules: [  
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|gif)$/, 
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
            outputPath: 'img/',
            publicPath: 'http:/111'
          }
        }
      },
      {
        test: require.resolve('jquery'),
        use: 'expose-loader?$',
      },
      { 
        test:/\.css$/, use:[
          {
            loader:'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          'css-loader',
          'postcss-loader',
        ] 
      },
      { 
        test:/\.less$/, use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader' //less -> css
        ] 
      },

      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ['@babel/plugin-proposal-class-properties', { "loose": true}],
                '@babel/plugin-transform-runtime'
                
              ]
            }
          }
        ],
        include: path.resolve(__dirname,'src'),
        exclude: /node_modules/
       
      }
    ]
  }
};
