const err = (msg) => {
  throw msg;
};
const el = (v) => document.createElement(v);
const pageDvided = 10;

export default class Pagination {
  static base = {
    currentPage: 1,
    totalItemCount: 0,
    pagePerItemCount: 20,
  };
  constructor(stateParams) {
    this.#setParams(stateParams, Pagination.base);
  }
  setState(nextStateParams) {
    this.#setParams(nextStateParams, this);
  }
  getState() {
    return {
      currentPage: this.currentPage,
      totalItemCount: this.totalItemCount,
      pagePerItemCount: this.pagePerItemCount,
    };
  }
  #setParams({ currentPage, totalItemCount, pagePerItemCount } = {}, base) {
    const {
      currentPage: basePage,
      totalItemCount: baseItemCount,
      pagePerItemCount: basePageCount,
    } = base;
    this.currentPage = this.#chCurrPage(currentPage) || basePage;
    this.totalItemCount = this.#chTotalItemCnt(totalItemCount) ?? baseItemCount;
    this.pagePerItemCount = this.#chPageCtn(pagePerItemCount) || basePageCount;
  }
  #check(arg, bool) {
    if ((bool ? arg >= 0 : arg > 0) && typeof arg === 'number') return arg;
    else return null;
  }
  #chCurrPage(currentPage) {
    return this.#check(currentPage, 1);
  }
  #chTotalItemCnt(totalItemCount) {
    return this.#check(totalItemCount, true);
  }
  #chPageCtn(pagePerItemCount) {
    return this.#check(pagePerItemCount, 2);
  }
}
class Renderer {
  constructor(app) {
    this.app = app;
  }
  render() {
    this._render();
  }
  _render() {
    err('must be overrided!');
  }
}

class DomRenderer extends Renderer {
  constructor(container, app) {
    super(app);
    this.container = container;
    this.render();
  }
  _render() {
    let { currentPage, totalItemCount, pagePerItemCount } = this.app.getState();
    const totalPageCount = Math.ceil(totalItemCount / pagePerItemCount);
    if (!totalPageCount) return '<div></div>';
    if (currentPage > totalPageCount) {
      this.app.setState({ currentPage: totalPageCount });
      this.render();
    }
    const firstPage = parseInt((currentPage - 1) / pageDvided) * pageDvided + 1;
    const lastPage = firstPage + pageDvided - 1;
    const children = Array.from({ length: totalPageCount }, (_, i) => el('span'));
    children[currentPage - 1].classList.add('current-page');
    const string = children
      .map((ch, i) => ((ch.innerHTML = i + 1), ch.outerHTML))
      .slice(firstPage - 1, lastPage)
      .join('');

    const html =
      (currentPage > 1 ? `<button class="prev-page"></button>` : '') +
      string +
      (children.length !== currentPage ? `<button class="next-page"></button>` : '');

    this.container.innerHTML = html;

    this.container.querySelector('.next-page')?.addEventListener('click', () => {
      this.app.setState({ currentPage: currentPage + 1 });
      this.render();
    });
    this.container.querySelector('.prev-page')?.addEventListener('click', () => {
      this.app.setState({ currentPage: currentPage - 1 });
      this.render();
    });
    this.container.onclick = (e) => {
      if (e.target.tagName === 'SPAN') {
        this.app.setState({ currentPage: +e.target.innerHTML });
        this.render();
      }
    };
  }
}

new DomRenderer(
  document.querySelector('.container'),
  new Pagination({ currentPage: 10, totalItemCount: 500, pagePerItemCount: 10 }),
);
