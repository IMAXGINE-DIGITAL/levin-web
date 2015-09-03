var webpack = require('webpack');

sourceMapPlugin = new webpack.SourceMapDevToolPlugin({
  // asset matching
  test: /\.js$/,

  // file and reference
  filename: './temp/[name].js.map',
  append: '//# sourceMappingURL=[url]',

  moduleFilenameTemplate: '../[resourcePath]'

  // quality/performance
  // module: true,
  // columns: true,
  // lineToLine: true
});

module.exports = {
  entry: {
    levin: './src/main.js',
  },
  output: {
    filename: './temp/[name].js',
    devtoolModuleFilenameTemplate: '/[resourcePath]'
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: 'style-loader!raw-loader!less-loader' },
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' } ,
      { test: /\.(jpg|gif|png)/, loader: 'url!img'}
    ]
  },
  plugins: [
    sourceMapPlugin
  ],
  resolve: {
    extensions: ['', '.js', '.less', '.jpg', '.gif', '.png']
  }
};