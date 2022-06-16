/**
 * tablink webpack.prod.config.js
 * @author kongjianqiu
 * @description
 * @created 2022/6/13 16:31:49
 */

const {merge} = require('webpack-merge')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const config = require('./webpack.base.config')
const path = require("path");
const resolve = dir => path.join(__dirname, '..', dir)
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
const prod = {
    mode: 'production',
    entry: {
        "Tablink": resolve('src/tablink.js'),
        "Tablink.min": resolve('src/tablink.js'),
    },
    output: {
        // 输出文件
        filename: '[name].js',
        // 输出目录
        path: resolve('lib'),
        // 库名称
        library: {
            name: 'Tablink',
            type: 'umd',
            export: 'default',
        },
        // 兼容node和浏览器运行，避免window is not undefined情况
        globalObject: 'this',
        // 在生成文件之前清空 output 目录
        clean: true
    },
    stats: 'normal',
    devtool: 'source-map',
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ],
}

module.exports = merge(config, prod)
