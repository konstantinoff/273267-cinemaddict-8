import Component from './component';

export default class Search extends Component {
  constructor() {
    super();
    this._onSearchButtonClick = this._onSearchButtonClick.bind(this);
  }

  _onSearchButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }


  set onSearch(fn) {
    this._onClick = fn;
  }

  bind() {
    this._element.addEventListener(`keyup`, this._onSearchButtonClick);
  }
  unbind() {
    this._element.removeEventListener(`keyup`, this._onSearchButtonClick);
  }
  get template() {
    return `<input type="text" name="search" class="search__field" placeholder="Search">`;
  }
}


