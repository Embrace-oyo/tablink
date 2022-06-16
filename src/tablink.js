/**
 * tablink tablink.js
 * @author kongjianqiu
 * @description
 * @created 2022/6/10 16:28:44
 */

class Tablink {
    constructor(props = {}) {
        this.tabIndex = -1;
        this.contentDom = props.contentDom || null
        this.tabDom = props.tabDom || null
        this.itemListDom = props.itemListDom || null
        this.offset = props.offset || 0
        this.callback = props.callback || null
    }

    listener() {
        let scrollH = this.contentDom.scrollHeight
        let contentDomH = this.contentDom.clientHeight
        let _this = this
        this.contentDom.addEventListener('scroll', this.throttle(function () {
            let scrollTop = _this.contentDom.scrollTop + _this.offset;
            let isBottom = scrollTop + contentDomH >= scrollH;
            let interval = null;
            for (let i = 0; i < _this.itemListDom.length; i++) {
                let curTop = _this.itemListDom[i].offsetTop - _this.offset;
                // 如果是最后一个
                if (i === _this.itemListDom.length - 1) {
                    let curHeight = _this.itemListDom[i].offsetHeight;
                    interval =
                        scrollTop >= curTop &&
                        scrollTop <= curTop + curHeight;
                } else {
                    let nextTop = _this.itemListDom[i + 1].offsetTop;
                    interval = scrollTop >= curTop && scrollTop < nextTop;
                }
                if (interval) _this.tabIndex = i;
                // 滚动到第一个字母前
                if (scrollTop < _this.itemListDom[0].offsetTop) _this.tabIndex = -1;
                // 滚动到页面最底部（最后一个字母时）
                if (isBottom) _this.tabIndex = _this.itemListDom.length - 1;
            }
            _this.callback(_this.tabIndex)
        }, 200, 500))
    }

    click(id, index) {
        if (!id || !index) return
        this.tabIndex = index;
        let dom = document.getElementById(id);
        this.contentDom.scrollTo(0, dom.offsetTop - this.offset);
    }

    throttle(func, wait, mustRun) {
        let timeout,
            startTime = new Date();

        return function () {
            let context = this,
                args = arguments,
                curTime = new Date();

            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            if (curTime - startTime >= mustRun) {
                func.apply(context, args);
                startTime = curTime;
                // 没达到触发间隔，重新设定定时器
            } else {
                timeout = setTimeout(func, wait);
            }
        };
    };

    debounce(func, wait, immediate) {
        let timeout;
        return function () {
            let context = this, args = arguments;
            let later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    init() {
        if (!this.contentDom) return
        this.listener()
    }
}

export default Tablink
