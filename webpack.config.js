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
    entry: {
        main: Path.src + '/js/main.js'
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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    // use: ['css-loader', 'autoprefixer-loader?safe=true', 'sass-loader']
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('./css/main.css')
    ]
}

if (NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = config;