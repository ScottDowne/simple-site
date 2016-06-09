require(`habitat`).load();

var path = require(`path`);
var webpack = require(`webpack`);
var ExtractTextPlugin = require(`extract-text-webpack-plugin`);
var autoprefixer = require(`autoprefixer`);

module.exports = {
  entry: [`./dist/client.js`, `./less/index.less`],
  output: {
    filename: `[name].js`,
    chunkFilename: `[id].chunk.js`,
    path: path.join(`public`, `build`),
    publicPath: `/build/`
  },
  resolve: {
    extensions: [``, `.js`]
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [`json-loader`] },
      {
        test: /\.png/,
        loaders: [`file-loader`] },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader: `url-loader?limit=8192`
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(`style-loader`, `css-loader!postcss-loader!less-loader`),
        exclude: [`node_modules`]
      }
    ]
  },
  postcss: [autoprefixer],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({})
    }),
    new ExtractTextPlugin(`[name].css`)
  ]
};
