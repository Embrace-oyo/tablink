/**
 * tablink config.js
 * @author kongjianqiu
 * @description
 * @created 2022/6/13 15:33:15
 */
require('@babel/polyfill')
const config = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // 也可以写成presets:['babel-preset-env']
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    }
}
module.exports = config
