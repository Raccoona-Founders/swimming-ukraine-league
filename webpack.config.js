const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const Path = {
    src: path.join(__dirname, 'src'),
    public: path.join(__dirname, 'public')
};

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
        modules: [
            Path.src,
            path.resolve(__dirname, 'node_modules')
        ]
    },
    entry: {
        main: Path.src + '/js/main.jsx'
    },
    output: {
        path: Path.public,
        filename: './js/[name].bundle.js',
        publicPath: Path.public
    },
    watchOptions: {
        aggregateTimeout: 100
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('./css/main.css')
    ]
};

module.exports = config;
