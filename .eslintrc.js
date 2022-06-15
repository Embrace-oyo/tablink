/**
 * tablink .eslintrc.js
 * @author kongjianqiu
 * @description
 * @created 2022/6/15 14:52:28
 */
module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true
    },
    extends: "airbnb-base",
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    }
};
