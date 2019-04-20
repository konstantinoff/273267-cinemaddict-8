import Component from './component';

export default class Search extends Component {
  constructor() {
    super();
    this._onSearchButtonClick = this._onSearchButtonClick.bind(this);
  }

  get template() {
    return `<input type="text" name="search" class="search__field" placeholder="Search">`;
  }

  set onSearch(fn) {
    this._onClick = fn;
  }

  _onSearchButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }
  bind() {
    this._element.addEventListener(`keyup`, this._onSearchButtonClick);
  }
  unbind() {
    this._element.removeEventListener(`keyup`, this._onSearchButtonClick);
  }
}


