const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


const isProduction = process.env.NODE_ENV === 'production';


module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    background: './src/background.js',
    content: './src/content.js',
    // content: './src/contentOriginal.js',
    // index: './src/index.js', 
    // css: './src/styles/index.css', 
    // popup: './src/popup.js', // If you have a popup script
  },
  watch: !isProduction, // Add this to enable watch mode
  watchOptions: {
    ignored: /node_modules/, // Ignore node_modules to speed up the process
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, process.env.BUILD_FOLDER || 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // can't use style loader because we need to import as string
          // 'to-string-loader',
          'css-loader',
          'postcss-loader', // Add postcss-loader here,
          // 'raw-loader', // Use raw-loader to get CSS as a string
        ],
      },
      // {
      //   test: /\.css$/,
      //   use: 'raw-loader', // Use raw-loader to get CSS as a string
      // },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        include: path.resolve(__dirname, 'src/assets/font-images'),  // Only images in this folder
        type: 'asset/inline'  // Convert images to base64 and inline them in the bundle
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        type: 'asset/resource',
        exclude: path.resolve(__dirname, 'src/assets/font-images'),
        generator: {
          filename: 'assets/[name][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
          }
        : false,
    }),
    ...(isProduction ? [new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' })] : []),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: '' },
        { from: 'public/icons/', to: 'icons/' },
      ],
    }),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [
      `...`, // extends the default minimizers
      new CssMinimizerPlugin(),
    ],
  },
  devtool: isProduction ? false : 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
};
