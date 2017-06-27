'use strict';
var webpack                         = require('webpack'),
    ExtractTextPlugin               = require('extract-text-webpack-plugin'),
    HtmlPlugin                      = require('html-webpack-plugin'),
    path                            = require('path'),
    _                               = require('lodash'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var packageJson = require(__dirname + '/package.json');
var app = {
    name:packageJson.name[0].toUpperCase() + packageJson.name.slice(1),
    path:path.join(__dirname,'app'),
    globalStylePath:path.join(__dirname,'style')
};
module.exports = {
    entry:{
        ['js/'+packageJson.name]:'./app/app.js',
        ['../demo/index']:'./demo/_index.js',
        'css/style.bundle':'./style/style.styl'
    },
    output:{
        path:'./bundle/',
        filename:'[name].js',
        publicPath: '../bundle/'
    },
    resolve:{
        alias:{
            _app:app.path,
            _interfaces:path.join(__dirname,'app','interfaces'),
            _models:path.join(__dirname,'app','models'),
            _components:path.join(__dirname,'app','components')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include:[
                    app.path,
                    path.join(__dirname,'demo','_index.js')
                ],
                loader:'babel',
                query: {
                    presets: ['es2015'],
                    //cacheDirectory: true
                }
            },
            {
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?browsers=last 10 version!stylus-loader'),
                test: /\.styl$/,
                include:[
                    app.path,
                    app.globalStylePath
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {//сжимает файлы в base64 и пихает строкой, при достижении лимита перетаскивает файлы в bundle
                test   : /\.(ttf|eot|svg|woff|otf|png|jpg|gif)(\?[a-z0-9]+)?$/,
                loader : 'url-loader?limit=2000&name=style/assets/[path][name].[ext]'
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                include:[
                    app.path
                ]
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true,
        //     warnings: false
        // }),

        new HtmlPlugin({
            title: app.name,
            inject: false,
            filename: path.join(__dirname, 'demo','index.html'),
            template: path.join(__dirname,'templates', 'index.html.ejs')
        }),
        new HtmlPlugin({
            info:{
                name: packageJson.name,
                version: packageJson.version,
                description: packageJson.description,
                repository:packageJson.repository.url
            },
            title: app.name,
            inject: false,
            filename: path.join(__dirname, 'README.md'),
            template: path.join(__dirname,'templates', 'README.md.ejs')
        }),
        new HtmlPlugin({
            info:{
                name: packageJson.name
            },
            title: app.name,
            inject: false,
            filename: path.join(__dirname, 'index.js'),
            template: path.join(__dirname, 'templates', 'index.js.ejs')
        }),
        new ExtractTextPlugin('[name].css'),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            server: { baseDir: [__dirname] }
        })
    ]
};