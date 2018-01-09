const webpack = require('webpack');
const path = require('path');


module.exports = {

    target: 'node',
    entry: {},

    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
    },

    devtool: "source-map",

    resolve: {
        extensions: ['.webpack.js', '.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|dist)/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            }
        ]
    },

    plugins: [],

    externals: {}
};
