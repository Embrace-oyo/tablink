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
        lib: resolve('src/index.js')
    },
    output: {
        // 输出目录
        path: resolve('lib'),
        // 库名称
        library: 'tablink',
        // 输出文件
        filename: '[name].js',
        // 采用通用模块定义
        libraryTarget: 'umd',
        // 兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范
        libraryExport: 'default',
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
