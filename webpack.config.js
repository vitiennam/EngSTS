const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: "development",
  mode: "production",
  entry: {
    index: "./src/js/index.ts",
    history: "./src/js/history.ts",
    flashCard: "./src/js/flashCard.ts",
    login:"./src/js/login.ts",

  },
  // devtool: 'inline-soure-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'English Search Web',
      template: './src/index.html',
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
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
    
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    // filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean : true,
    publicPath: "/",
  },
  optimization: {
    runtimeChunk: "single"
  }
};