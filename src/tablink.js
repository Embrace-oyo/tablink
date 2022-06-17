/**
 * tablink tablink.js
 * @author kongjianqiu
 * @description
 * @created 2022/6/10 16:28:44
 */

class Tablink {
  constructor(props = {}) {
    this.tabIndex = -1;
    this.contentDom = props.contentDom || null;
    this.tabDom = props.tabDom || null;
    this.itemListDom = props.itemListDom || null;
    this.offset = props.offset || 0;
    this.callback = props.callback || null;
  }

  listener() {
    const scrollH = this.contentDom.scrollHeight;
    const contentDomH = this.contentDom.clientHeight;
    const _this = this;
    this.contentDom.addEventListener('scroll', this.throttle(() => {
      const scrollTop = _this.contentDom.scrollTop + _this.offset;
      const isBottom = scrollTop + contentDomH >= scrollH;
      let interval = null;
      for (let i = 0; i < _this.itemListDom.length; i++) {
        const curTop = _this.itemListDom[i].offsetTop - _this.offset;
        // 如果是最后一个
        if (i === _this.itemListDom.length - 1) {
          const curHeight = _this.itemListDom[i].offsetHeight;
          interval = scrollTop >= curTop
                        && scrollTop <= curTop + curHeight;
        } else {
          const nextTop = _this.itemListDom[i + 1].offsetTop;
          interval = scrollTop >= curTop && scrollTop < nextTop;
        }
        if (interval) _this.tabIndex = i;
        // 滚动到第一个字母前
        if (scrollTop < _this.itemListDom[0].offsetTop) _this.tabIndex = -1;
        // 滚动到页面最底部（最后一个字母时）
        if (isBottom) _this.tabIndex = _this.itemListDom.length - 1;
      }
      _this.callback(_this.tabIndex);
    }, 200, 500));
  }

  click(id, index) {
    if (!id || !index) return;
    this.tabIndex = index;
    const dom = document.getElementById(id);
    this.contentDom.scrollTo(0, dom.offsetTop - this.offset);
  }

  throttle(func, wait, mustRun) {
    let timeout;
    let startTime = new Date();

    return function () {
      const context = this;
      const args = arguments;
      const curTime = new Date();

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
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this; const
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  init() {
    if (!this.contentDom) return;
    this.listener();
  }
}

export default Tablink;
