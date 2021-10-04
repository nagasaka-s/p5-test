const ExtractTextPlugin = require('extract-text-webpack-plugin');
const routeDataMapper = require('webpack-route-data-mapper');
const readConfig = require('read-config');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// base config
const SRC = './src';
const DIST = '../public';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV;

const isProduct = ENV === 'product';

const constants = readConfig(`${SRC}/constants.yml`);
const { ROOT_DIR, DEV_DIR, IMG_DIR } = constants;
const BASE_DIR = isProduct ? ROOT_DIR : DEV_DIR;
constants.BASE_DIR = BASE_DIR;

// page/**/*.pug -> dist/**/*.html
const htmlTemplates = routeDataMapper({
  baseDir: `${SRC}/pug/page`,
  src: '**/[!_]*.pug',
  locals: Object.assign({}, constants, {
    meta: readConfig(`${SRC}/pug/meta.yml`),
    is_develop: !isProduct
  })
});

module.exports = {
  // エントリーファイル
  entry: {
    'assets/js/script.js': `${SRC}/js/script.js`,
    'assets/css/style.css': `${SRC}/scss/style.scss`,
  },
  // 出力するディレクトリ・ファイル名などの設定
  output: {
    path: path.join(path.resolve(__dirname, DIST), BASE_DIR),
    filename: '[name]',
    publicPath: BASE_DIR,
  },
  module: {
    // 各ファイル形式ごとのビルド設定
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              root: path.resolve(__dirname, SRC, 'pug'),
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                // falseで相対パスにする
                url: false,
                importLoaders: 2,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [`${SRC}/scss`],
                data: `$image_directory: "${BASE_DIR}${IMG_DIR}";`,
              },
            },
            'import-glob-loader',
          ],
        }),
      },
      {
        test: /.ya?ml$/,
        loader: 'js-yaml-loader',
      },
    ],
  },
  // webpack-dev-serverの設定
  devServer: {
    host: HOST,
    port: PORT,
    contentBase: DIST,
    openPage: path.relative('/', BASE_DIR),
  },
  // キャシュ有効化
  cache: true,
  // 拡張子省略時のpath解決
  resolve: {
    extensions: ['.js', '.json', '*'],
    alias: {
      '@': path.join(__dirname, SRC, 'js'),
    },
  },
  plugins: [
    // 複数のHTMLファイルを出力する
    ...htmlTemplates,
    // style.cssを出力
    new ExtractTextPlugin('[name]'),
    new CopyPlugin({
      patterns: [{
        from: path.join(__dirname, SRC, 'img'),
        to: IMG_DIR,
        noErrorOnMissing: true,
      }],
    }),
    new CleanWebpackPlugin(),
  ],
};
