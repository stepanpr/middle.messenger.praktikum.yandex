const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[fullhash:8].js',
    },
    devtool: false,
    optimization: {
        minimize: true,
    },
});
