!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.tablink = e() : t.tablink = e()
}(this, (() => {
    return t = {
        966: (t, e, o) => {
            var n = o(404);
            t.exports = n
        }, 404: t => {
            t.exports = function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    e = {tabDom: null, contentDom: null};
                Object.assign(e, t), this.Init = function () {
                }, this.Listener = function () {
                }, this.click = function () {
                }
            }
        }
    }, e = {}, function o(n) {
        var i = e[n];
        if (void 0 !== i) return i.exports;
        var r = e[n] = {exports: {}};
        return t[n](r, r.exports, o), r.exports
    }(966).default;
    var t, e
}));
//# sourceMappingURL=lib.js.map
