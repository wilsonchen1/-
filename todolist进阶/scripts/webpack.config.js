const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development",
  entry: './src/main.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },

      // 处理html中的静态资源
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      // 处理css
      {
        test: /.css$/,
        // 数组从后往前执行，先执行css-loader
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

    ]
  },
  plugins: [
    // 清理插件，可以在每次编译之前清空dist目录
    new CleanWebpackPlugin(),
    // 可以将引入的样式合并输出到css文件
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash:5].css",
    }),
    // 根据模板生成html文件
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};