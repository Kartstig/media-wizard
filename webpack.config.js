const webpack = require('webpack');
const path = require('path');

const plugins = [];
const NODE_ENV = process.env.ENV ? process.env.ENV.toLowerCase() : 'dev';

if(NODE_ENV === 'prod') {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    }
  }));
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }));
}

module.exports = {
  context: __dirname,
  entry: {
    main: path.join(__dirname, '/ui/src/bundles/main'),
  },
  output: {
    path: path.join(__dirname, '/media_wizard/static/js'),
    filename: 'bundle-[name].js',
    publicPath: '/static/'
  },
  resolve: {
    modules: [
      path.join(__dirname, '/ui/src/components'),
      path.join(__dirname, '/node_modules'),
    ]
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|ttf|woff2?|otf|jpg|png|svg)(\?.*$|$)/,
        loader: 'url-loader?limit=1000000'
      }
    ]
  },
  plugins: plugins
};
