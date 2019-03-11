import Component from './component';

export default class GetFilmCard extends Component {
  constructor({title, filmDescription, filmRange, filmMark, filmDate, genre, poster}) {
    super();
    this._title = title;
    this._description = filmDescription;
    this._filmRange = filmRange;
    this._filmMark = filmMark;
    this._filmDate = filmDate;
    this._genre = genre;
    this._poster = poster;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _onEditButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }
  set onClick(fn) {
    this._onClick = fn;
  }
  bind() {
    this._element.querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._onEditButtonClick);
  }
  unbind() {
    this._element.querySelector(`.film-card__comments`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  get template() {
    const year = this._filmDate.getFullYear();
    const filmHours = Math.floor((this._filmRange / 60));
    const filmMinutes = this._filmRange % 60;
    return `<article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._filmMark}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${filmHours}h ${filmMinutes}m</span>
            <span class="film-card__genre">${this._genre[0]}</span>
          </p>
          <img src="${this._poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${this._description.join(`. `)}</p>
          <button class="film-card__comments">13 comments</button>

          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>
        </article>`;
  }
}


