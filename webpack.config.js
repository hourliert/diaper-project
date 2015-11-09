import path from 'path';
import webpack from 'webpack';
import MutliProgress from 'multi-progress';

const multi = new MutliProgress();
const DEBUG = !process.argv.includes('release'); // By default, we are in DEBUG mode. To exit from DEBUG mode, launch the npm task with ``-- release` at the end. Eg. `npm start -- release`
const VERBOSE = process.argv.includes('verbose'); // By default, we are NOT in VERBOSE mode. You can activate this option by running for instance `npm start -- verbose`.
const WATCH = process.argv.includes('serve'); // Define in `./tools/start.js`

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};
const JS_LOADER = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  include: __dirname,
  loader: 'babel-loader',
};

// Common config. Used both for client and server.
const commonConfig = {
  output: {
    publicPath: '/client/',
  },

  cache: DEBUG,
  debug: VERBOSE,
  verbose: VERBOSE,
  displayErrorDetails: VERBOSE,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.txt$/,
        loader: 'raw-loader',
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
    ],
  },

  postcss: function plugins(bundler) {
    return [
      require('postcss-import')({ addDependencyTo: bundler }),
      require('postcss-nested')(),
      require('postcss-cssnext')({ autoprefixer: AUTOPREFIXER_BROWSERS }),
    ];
  },
};

const clientBar = multi.newBar('Client [:bar] :percent :elapsed s', {
  total: 100,
  clear: true,
});

// Client specific config. We merge the new config with the common config.
const appConfig = Object.assign({}, commonConfig, {
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  entry: [
    ...(WATCH ? ['webpack-hot-middleware/client'] : []),
    './src/client',
  ],
  output: {
    path: path.join(__dirname, './build/client'),
    filename: 'bundle.js',
    publicPath: '/client/',
  },
  plugins: [
    ...commonConfig.plugins, // Thanks to the ES2015 spread operator, we could save a lot of lines here.
    new webpack.DefinePlugin(GLOBALS),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: VERBOSE,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ] : []),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : []),
    new webpack.ProgressPlugin((percentage) => {
      clientBar.update(percentage);
    }),
  ],
  module: {
    loaders: [
      WATCH ? {
        ...JS_LOADER,
        query: {
          // Wraps all React components into arbitrary transforms
          // https://github.com/gaearon/babel-plugin-react-transform
          plugins: ['react-transform'],
          extra: {
            'react-transform': {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module'],
                },
              ],
            },
          },
        },
      } : JS_LOADER,
      ...commonConfig.module.loaders,
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
    ],
  },
});

const serverBar = multi.newBar('Server [:bar] :percent :elapsed s', {
  total: 100,
  clear: true,
});

// Server specific config. We merge the new config with the common config.
const serverConfig = Object.assign({}, commonConfig, {
  devtool: 'source-map',
  entry: [
    './src/server',
  ],
  output: {
    path: path.join(__dirname, './build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  plugins: [
    ...commonConfig.plugins,
    new webpack.DefinePlugin(GLOBALS),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
    new webpack.ProgressPlugin((percentage) => {
      serverBar.update(percentage);
    }),
  ],
  module: {
    loaders: [
      JS_LOADER,
      ...commonConfig.module.loaders,
      {
        test: /\.css$/,
        loader: 'css-loader!postcss-loader',
      },
    ],
  },
});

export default [appConfig, serverConfig];
