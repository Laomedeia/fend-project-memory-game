const path = require("path"); // 导入路径包
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
// var webpackConfig = require("./webpack.config");
// var compiler = webpack(webpackConfig);

// app.use(require("webpack-dev-middleware")(compiler, {
//     noInfo: true, publicPath: '/'
// }));
// app.use(require("webpack-hot-middleware")(compiler));

module.exports = {
  //entry: './src/js/app.js', //入口文件
  entry: __dirname + "/src/main.js",
  output: {
    path: __dirname + "/dist", // publicPath: '/assets/', // 指定资源文件引用的目录，也就是说用/assests/这个路径指代path，开启这个配置的话，index.html中应该要引用的路径全部改为'/assets/...'
    //path: path.resolve(__dirname, 'build'), // 指定打包之后的文件夹
    filename: 'bundle.js' // 指定打包为一个文件 bundle.js
    // filename: "[name].js" // 可以打包为多个文件
  },
  // 使用loader模块
  module: {
    loaders:[
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader' 
      },
      {
          test: /\.js[x]?$/,
          exclude: '/node_modules/',
          loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|ico)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
            name: 'img/[name].[ext]'
        } 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin()
  ]
};
