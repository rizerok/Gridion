const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');


module.exports = {
    entry:{
        index:path.resolve('dev','source','index.js')
    },
    output:{
        filename:'[name].js',
        path:path.resolve('dev','compiled')
    },
    devtool:'cheap-eval-source-map',
    devServer:{
        contentBase: path.resolve('dev','compiled'),
        openPage:'',
        watchContentBase: true
    },
    plugins:[
        new CleanWebpackPlugin(
            ['compiled'],
            {
                root:     path.resolve('dev'),
                verbose:  true
            }
        ),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title:'for library develop',
            inject:false,
            template: path.resolve('dev','source','index.html.ejs'),
            filename:path.resolve('dev','compiled','index.html')
        }),
        new HtmlWebpackHarddiskPlugin()
    ]
};