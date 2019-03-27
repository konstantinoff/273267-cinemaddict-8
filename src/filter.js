import Component from './component';


export default class Filter extends Component {
  constructor([filterName, filterAmount]) {
    super();
    this._filterName = filterName;
    this._filterAmount = filterAmount;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterClick(e) {
    e.preventDefault();
    return typeof this._onFilter === `function` && this._onFilter();
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }


  get template() {
    return `<a href="#" class="main-navigation__item">${this._filterName} <span class="main-navigation__item-count">${this._filterAmount}</span></a>`;
  }
}
