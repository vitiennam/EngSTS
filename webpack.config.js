const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// var webpack = require('webpack');
// var hotMiddlewareScript =
//   'webpack-hot-middleware/client?path=http://localhost:8080';
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
    chunks: ['index'],
    scriptLoading: 'defer',
    favicon: 'svg/045cf9ff2cf53a74e4ab328c248ddd9c.ico/favicon.ico'
  }),
  new HtmlWebpackPlugin({
    title: 'History',
    filename: 'history.html',
    template: './src/history.html',
    chunks: ['history'],
    scriptLoading: 'defer',
    favicon: 'svg/045cf9ff2cf53a74e4ab328c248ddd9c.ico/favicon.ico'
  }),
  new HtmlWebpackPlugin({
    title: 'flash_card',
    filename: 'flash_card.html',
    template: './src/flash_card.html',
    chunks: ['flashCard'],
    scriptLoading: 'defer',
    favicon: 'svg/045cf9ff2cf53a74e4ab328c248ddd9c.ico/favicon.ico'
  }),
  new HtmlWebpackPlugin({
    title: 'login',
    filename: 'login.html',
    template: './src/login.html',
    chunks: ['login'],
    scriptLoading: 'defer',
    favicon: 'svg/045cf9ff2cf53a74e4ab328c248ddd9c.ico/favicon.ico'
  }),
  new HtmlWebpackPlugin({
    title: 'register',
    filename: 'register.html',
    template: './src/register.html',
    chunks: ['register'],
    scriptLoading: 'defer',
    favicon: 'svg/045cf9ff2cf53a74e4ab328c248ddd9c.ico/favicon.ico'
  }),
  new HtmlWebpackPlugin({
    title: 'register',
    filename: 'main.html',
    template: './src/main.html',
    chunks: ['main'],
    scriptLoading: 'defer',
    favicon: 'svg/045cf9ff2cf53a74e4ab328c248ddd9c.ico/favicon.ico'
  }),
  
]

let exportSetting = {
  mode: process.env.NODE_ENV,
  target: 'web',

  entry: {
    index: "./src/js/index.ts",
    history: "./src/js/history.ts",
    flashCard: "./src/js/flashCard.ts",
    login:"./src/js/login.ts",
    register:"./src/js/register.ts",
    main:"./src/js/main.ts",
    // main: [ './src/main.js', hotMiddlewareScript],

    // index: ["./src/js/index.ts", hotMiddlewareScript],
    // history: ["./src/js/history.ts", hotMiddlewareScript] ,
    // flashCard: ["./src/js/flashCard.ts", hotMiddlewareScript],
    // login: ["./src/js/login.ts", hotMiddlewareScript],


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
    // filename: '[name].[contenthash].bundle.js',
    filename: '[name].js',
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
  // exportSetting.plugins.push(new webpack.HotModuleReplacementPlugin())

}
// console.log(exportSetting.plugins)

module.exports = exportSetting