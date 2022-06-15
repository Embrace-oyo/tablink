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
        this.contentDom.addEventListener('scroll', (e) => {
            let scrollTop = this.contentDom.scrollTop + this.offset;
            let isBottom = scrollTop + contentDomH >= scrollH;
            let interval = null;
            for (let i = 0; i < this.itemListDom.length; i++) {
                let curTop = this.itemListDom[i].offsetTop - this.offset;
                // 如果是最后一个
                if (i === this.itemListDom.length - 1) {
                    let curHeight = this.itemListDom[i].offsetHeight;
                    interval =
                        scrollTop >= curTop &&
                        scrollTop <= curTop + curHeight;
                } else {
                    let nextTop = this.itemListDom[i + 1].offsetTop;
                    interval = scrollTop >= curTop && scrollTop < nextTop;
                }
                if (interval) this.tabIndex = i;
                // 滚动到第一个字母前
                if (scrollTop < this.itemListDom[0].offsetTop) this.tabIndex = -1;
                // 滚动到页面最底部（最后一个字母时）
                if (isBottom) this.tabIndex = this.itemListDom.length - 1;
            }
            this.callback(this.tabIndex)
        })
    }

    click(id, index) {
        if (!id || !index) return
        this.tabIndex = index;
        let dom = document.getElementById(id);
        this.contentDom.scrollTo(0, dom.offsetTop - this.offset);
    }

    init() {
        if (!this.contentDom) return
        this.listener()
    }
}


/*function Tablink(options = {}) {
    console.log(123)
    const defaultOptions = {
        tabDom: null,
        contentDom: null,
    };
    Object.assign(defaultOptions, options);
    const _this = this;
    const tabIndex = -1;
    this.Init = () => {

    };
    this.Listener = () => {

    };

    this.click = () => {

    };
}*/

// module.exports = Tablink;
