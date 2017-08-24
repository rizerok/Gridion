const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pj = require(path.resolve('package.json'));
const demo = fs.readdirSync(path.resolve('demo','handled'));

let extractStylus = new ExtractTextPlugin({
    filename: '[name].css'
});

module.exports = {
    output:{
        library:'Gridion',
        libraryTarget:'umd',
        libraryExport: 'default'
    },
    module:{
        rules:[
            {
                test: /\.styl$/,
                use: extractStylus.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            minimize:true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options:{
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'stylus-loader'
                    }]
                })
            }
        ]
    },
    devtool:'cheap-module-source-map',
    plugins:[
        new HtmlWebpackPlugin({
            inject:false,
            template: path.resolve('templates','README.md.ejs'),
            filename:path.resolve('README.md'),
            info:{
                name: pj.name[0].toUpperCase()+pj.name.slice(1),
                version: pj.version,
                description: pj.description,
                repository:pj.repository.url
            }
        }),
        new HtmlWebpackPlugin({
            inject:false,
            template: path.resolve('templates','.gitignore.ejs'),
            filename:path.resolve('.gitignore'),
            demo
        }),
        new webpack.optimize.UglifyJsPlugin({
            uglifyOptions:{
                compress: {
                    drop_console: true
                },
                warnings:false,
                output:{
                    comments: false
                }
            }
        }),
        extractStylus
    ]
};