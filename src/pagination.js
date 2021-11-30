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
    return this.#check(currentPage);
  }
  #chTotalItemCnt(totalItemCount) {
    return this.#check(totalItemCount, true);
  }
  #chPageCtn(pagePerItemCount) {
    return this.#check(pagePerItemCount);
  }
}
