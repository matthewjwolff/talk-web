const path = require('path');

module.exports = {
  mode:"development",
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
  },
  devtool:'inline-source-map'
};