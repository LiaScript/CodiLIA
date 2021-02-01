const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Fix possible nofile-issues
const fs = require('fs')
const gracefulFs = require('graceful-fs')
gracefulFs.gracefulify(fs)

module.exports = {
  name: 'app',
  plugins: [
    new webpack.ProvidePlugin({
      Visibility: 'visibilityjs',
      Cookies: 'js-cookie',
      key: 'keymaster',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'moment': 'moment',
      'Handlebars': 'handlebars'
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['font', 'index-styles', 'index'],
      filename: path.join(__dirname, 'public/views/build/index-header.ejs'),
      inject: false,
      chunksSortMode: 'manual'
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['index-styles-pack', 'index-styles', 'index'],
      filename: path.join(__dirname, 'public/views/build/index-pack-header.ejs'),
      inject: false,
      chunksSortMode: 'manual'
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['index'],
      filename: path.join(__dirname, 'public/views/build/index-scripts.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['common', 'index-pack'],
      filename: path.join(__dirname, 'public/views/build/index-pack-scripts.ejs'),
      inject: false,
      chunksSortMode: 'manual'
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['font', 'cover'],
      filename: path.join(__dirname, 'public/views/build/cover-header.ejs'),
      inject: false,
      chunksSortMode: 'manual'
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['cover-styles-pack', 'cover'],
      filename: path.join(__dirname, 'public/views/build/cover-pack-header.ejs'),
      inject: false,
      chunksSortMode: 'manual'
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['cover'],
      filename: path.join(__dirname, 'public/views/build/cover-scripts.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['common', 'cover-pack'],
      filename: path.join(__dirname, 'public/views/build/cover-pack-scripts.ejs'),
      inject: false,
      chunksSortMode: 'manual'
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['font', 'pretty-styles', 'pretty'],
      filename: path.join(__dirname, 'public/views/build/pretty-header.ejs'),
      inject: false,
      chunksSortMode: 'manual'
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['pretty-styles-pack', 'pretty-styles', 'pretty'],
      filename: path.join(__dirname, 'public/views/build/pretty-pack-header.ejs'),
      inject: false,
      chunksSortMode: 'manual'
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['pretty'],
      filename: path.join(__dirname, 'public/views/build/pretty-scripts.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['common', 'pretty-pack'],
      filename: path.join(__dirname, 'public/views/build/pretty-pack-scripts.ejs'),
      inject: false,
      chunksSortMode: 'manual'
    }),
    new CopyWebpackPlugin([
      {
        context: path.join(__dirname, 'node_modules/@hackmd/emojify.js'),
        from: {
          glob: 'dist/**/*',
          dot: false
        },
        to: 'emojify.js/'
      },
      {
        context: path.join(__dirname, 'node_modules/dictionary-de'),
        from: '*',
        to: 'dictionary-de/'
      },
      {
        context: path.join(__dirname, 'node_modules/dictionary-de-at'),
        from: '*',
        to: 'dictionary-de-at/'
      },
      {
        context: path.join(__dirname, 'node_modules/dictionary-de-ch'),
        from: '*',
        to: 'dictionary-de-ch/'
      },
      {
        context: path.join(__dirname, 'node_modules/fork-awesome'),
        from: 'fonts',
        to: 'fork-awesome/fonts'
      },
      {
        context: path.join(__dirname, 'node_modules/fork-awesome'),
        from: 'css',
        to: 'fork-awesome/css'
      },
      {
        context: path.join(__dirname, 'node_modules/@liascript/editor'),
        from: 'dist',
        to: 'liascript'
      }
    ]),
    new MiniCssExtractPlugin()
  ],

  entry: {
    font: path.join(__dirname, 'public/css/google-font.css'),
    common: [
      'expose-loader?jQuery!expose-loader?$!jquery',
      'velocity-animate',
      'imports-loader?$=jquery!jquery-mousewheel',
      'bootstrap'
    ],
    cover: [
      'babel-polyfill',
      path.join(__dirname, 'public/js/cover.js')
    ],
    'cover-styles-pack': [
      path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css'),
      path.join(__dirname, 'public/css/bootstrap-social.css'),
      path.join(__dirname, 'node_modules/select2/select2.css'),
      path.join(__dirname, 'node_modules/select2/select2-bootstrap.css')
    ],
    'cover-pack': [
      'babel-polyfill',
      'bootstrap-validator',
      'expose-loader?select2!select2',
      'expose-loader?moment!moment',
      path.join(__dirname, 'public/js/cover.js')
    ],
    index: [
      'babel-polyfill',
      'script-loader!jquery-ui-resizable',
      'script-loader!codemirror',
      'script-loader!inlineAttachment',
      'script-loader!jqueryTextcomplete',
      'script-loader!codemirrorInlineAttachment',
      'script-loader!ot',
      path.join(__dirname, 'public/js/index.js')
    ],
    'index-styles': [
      path.join(__dirname, 'public/vendor/jquery-ui/jquery-ui.min.css'),
      path.join(__dirname, 'public/vendor/codemirror-spell-checker/spell-checker.min.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/lib/codemirror.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/addon/fold/foldgutter.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/addon/display/fullscreen.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/addon/dialog/dialog.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/addon/scroll/simplescrollbars.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/addon/search/matchesonscrollbar.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/theme/monokai.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/theme/one-dark.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/theme/dracula.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/theme/material.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/theme/nord.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/theme/panda-syntax.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/theme/solarized.css'),
      path.join(__dirname, 'public/css/codemirror-extend/ayu-dark.css'),
      path.join(__dirname, 'public/css/codemirror-extend/ayu-mirage.css'),
      path.join(__dirname, 'public/css/codemirror-extend/tomorrow-night-bright.css'),
      path.join(__dirname, 'public/css/codemirror-extend/tomorrow-night-eighties.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/mode/tiddlywiki/tiddlywiki.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/mode/mediawiki/mediawiki.css'),
      path.join(__dirname, 'public/css/github-extract.css'),
      path.join(__dirname, 'public/vendor/showup/showup.css'),
      path.join(__dirname, 'public/css/markdown.css')
    ],
    'index-styles-pack': [
      path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css'),
      path.join(__dirname, 'public/css/bootstrap-social.css'),
      path.join(__dirname, 'node_modules/ionicons/css/ionicons.min.css')
    ],
    'index-pack': [
      'babel-polyfill',
      'script-loader!jquery-ui-resizable',
      'bootstrap-validator',
      'expose-loader?jsyaml!js-yaml',
      'expose-loader?moment!moment',
      'script-loader!handlebars',
      'expose-loader?hljs!highlight.js',
      'emojify.js',
      'script-loader!codemirror',
      'script-loader!inlineAttachment',
      'script-loader!jqueryTextcomplete',
      'script-loader!codemirrorInlineAttachment',
      'script-loader!ot',
      'expose-loader?io!socket.io-client',
      path.join(__dirname, 'public/js/index.js')
    ],
    pretty: [
      'babel-polyfill',
      path.join(__dirname, 'public/js/pretty.js')
    ],
    'pretty-styles': [
      path.join(__dirname, 'public/css/github-extract.css'),
      path.join(__dirname, 'public/css/markdown.css')
    ],
    'pretty-styles-pack': [
      path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css'),
      path.join(__dirname, 'node_modules/ionicons/css/ionicons.min.css')
    ],
    'pretty-pack': [
      'babel-polyfill',
      'expose-loader?jsyaml!js-yaml',
      'expose-loader?moment!moment',
      'script-loader!handlebars',
      'expose-loader?hljs!highlight.js',
      'emojify.js',
      path.join(__dirname, 'public/js/pretty.js')
    ]
  },

  output: {
    path: path.join(__dirname, 'public/build'),
    publicPath: '/build/',
    filename: '[name].js'
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js'],
    alias: {
      codemirror: path.join(__dirname, 'node_modules/@hackmd/codemirror/codemirror.min.js'),
      inlineAttachment: path.join(__dirname, 'public/vendor/inlineAttachment/inline-attachment.js'),
      jqueryTextcomplete: path.join(__dirname, 'public/vendor/jquery-textcomplete/jquery.textcomplete.js'),
      codemirrorInlineAttachment: path.join(__dirname, 'public/vendor/inlineAttachment/codemirror.inline-attachment.js'),
      ot: path.join(__dirname, 'public/vendor/ot/ot.min.js'),
      handlebars: path.join(__dirname, 'node_modules/handlebars/dist/handlebars.min.js'),
      'jquery-ui-resizable': path.join(__dirname, 'public/vendor/jquery-ui/jquery-ui.min.js'),
      'bootstrap-tooltip': path.join(__dirname, 'public/vendor/bootstrap/tooltip.min.js'),
      'emojify.js': path.join(__dirname, 'node_modules/@hackmd/emojify.js/dist/js/emojify-browser.min.js'),
      'markdown-it': path.join(__dirname, 'node_modules/markdown-it/dist/markdown-it.js'),
      markdownlint: path.join(__dirname, 'node_modules/markdownlint/demo/markdownlint-browser.js')
    }
  },

  externals: {
    'socket.io-client': 'io',
    'jquery': '$',
    'moment': 'moment',
    'handlebars': 'Handlebars',
    'highlight.js': 'hljs',
    'select2': 'select2'
  },

  module: {
    rules: [{
      test: /\.mjs$/,
      type: 'javascript/auto'
    }, {
      test: /\.js$/,
      use: [{ loader: 'babel-loader' }],
      exclude: [/node_modules/, /public\/vendor/]
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'sass-loader'
      ]
    }, {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'less-loader'
      ]
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [{ loader: 'file-loader' }]
    }, {
      test: /\.html$/,
      use: [{ loader: 'string-loader' }]
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { prefix: 'font/', limit: '5000' }
      }]
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit: '5000', mimetype: 'application/octet-stream' }
      }]
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit: '10000', mimetype: 'svg+xml' }
      }]
    }, {
      test: /.*\.svg$/,
      loader: 'string-loader'
    }, {
      test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit: '10000', mimetype: 'image/png' }
      }]
    }, {
      test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit: '10000', mimetype: 'image/gif' }
      }]
    }, {
      test: /@hackmd\/codemirror\/addon\/lint\/lint/,
      use: [{
        loader: 'script-loader'
      }]
    }]
  },
  node: {
    fs: 'empty'
  },

  stats: {
    assets: false
  }
}
