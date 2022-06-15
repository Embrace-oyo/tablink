/**
 * tablink webpack.dev.config.js
 * @author kongjianqiu
 * @description
 * @created 2022/6/13 16:32:04
 */
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const os = require("os");
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const portfinder = require('portfinder')
const ESLintPlugin = require('eslint-webpack-plugin');
const config = require('./webpack.base.config')
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const resolve = dir => path.join(__dirname, '..', dir)
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const ifaces = os.networkInterfaces()
let host = ''
let port = '8080'
//寻找以太网网址
for (let dev in ifaces) {
    ifaces[dev].forEach(function (details, alias) {
        if (details.family === 'IPv4' && details.address.indexOf('192.168.') === 0) {
            host = details.address
        }
    })
}

const dev = {
    entry: resolve('src/tablink.js'),
    output: {
        filename: 'js/[name].[chunkhash].bundle.js',
        path: resolve('example'),
        clean: true
    },
    mode: 'development',
    stats: 'errors-only',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        host: HOST || host,
        port: PORT || port,
        client: {
            logging: 'warn',
            progress: true
        },
        hot: true,
        open: false,
        compress: true,
    },
    plugins: [
        new ESLintPlugin({
            fix: true, // 启用ESLint自动修复功能
            extensions: ['js', 'jsx'],
            context: path.resolve('src'), // 文件根目录
            exclude: '/node_modules/',// 指定要排除的文件/目录
            cache: false //缓存
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new htmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, '../public/index.html')
        }),
    ],
}
const devConfig = merge(config, dev)

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || port
    portfinder.getPort((ERROR, PORT) => {
        if (ERROR) {
            reject(ERROR)
        } else {
            process.env.PORT = PORT
            devConfig.devServer.port = PORT
            devConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [
                        `Your application is running here: http://${devConfig.devServer.host}:${port}`,
                    ]
                }
            }))
            resolve(devConfig)
        }
    })
})
