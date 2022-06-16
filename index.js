/**
 * tablink index.js
 * @author kongjianqiu
 * @description
 * @created 2022/6/15 16:13:01
 */
if (process.env.NODE_ENV === "production") {
    module.exports = require("./lib/Tablink.min.js");
} else {
    module.exports = require("./lib/Tablink.js");
}

