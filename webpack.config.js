const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// var webpack = require('webpack');
require('dotenv').config()
  // mode: "production",
  // mode: "development",
const productMode = process.env.NODE_ENV === "production";
let pluginsSetting = [
  // new webpack.HotModuleReplacementPlugin(),
  //Setting Html file
  new HtmlWebpackPlugin({
    title: 'English Search Web',
    template: './src/index.html',
    //add index.js to Head of index.html file
    chunks: ['index'] 
  }),
  new HtmlWebpackPlugin({
    title: 'History',
    filename: 'history.html',
    template: './src/history.html',
    chunks: ['history']
  }),
  new HtmlWebpackPlugin({
    title: 'flash_card',
    filename: 'flash_card.html',
    template: './src/flash_card.html',
    chunks: ['flashCard']
  }),
  new HtmlWebpackPlugin({
    title: 'login',
    filename: 'login.html',
    template: './src/login.html',
    chunks: ['login']
  }),
  new HtmlWebpackPlugin({
    title: 'register',
    filename: 'register.html',
    template: './src/register.html',
    chunks: ['register']
  }),
  
]

let exportSetting = {
  mode: process.env.NODE_ENV,

  entry: {
    index: "./src/js/index.ts",
    history: "./src/js/history.ts",
    flashCard: "./src/js/flashCard.ts",
    login:"./src/js/login.ts",
    register:"./src/js/register.ts",
    // main: ['webpack-hot-middleware/client', './src/main.js'],

    // index: ['webpack-hot-middleware/client',  "./src/js/index.ts"],
    // history: ['webpack-hot-middleware/client',  "./src/js/history.ts"] ,
    // flashCard: ['webpack-hot-middleware/client', "./src/js/flashCard.ts"],
    // login: ['webpack-hot-middleware/client', "./src/js/login.ts"],

  },
  devServer: {
    static: './dist',
  },
  plugins: pluginsSetting,
  module: {
    //rule load ts file
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          productMode ? MiniCssExtractPlugin.loader  : "style-loader",
          "css-loader",
          // "postcss-loader",
          // "sass-loader",
        ],
      },
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader'],
      // },
    ],
    
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    //contenthash create hash string to add into filename
    filename: '[name].[contenthash].bundle.js',
    // filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    //Clean dist folder before build code
    clean : true,
    publicPath: "/",
  },
  optimization: {
    runtimeChunk: "single"
  }
}
if(productMode){
  exportSetting.plugins.push(new MiniCssExtractPlugin())

 
} else {
  exportSetting.devtool = 'inline-source-map'
}
// console.log(exportSetting.plugins)

module.exports = exportSetting