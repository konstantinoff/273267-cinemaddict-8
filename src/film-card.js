import Component from './component';
import moment from 'moment';

export default class GetFilmCard extends Component {
  constructor({title, filmDescription, filmRange, filmMark, filmDate, genre, poster, userComments, watchList, watched}) {
    super();
    this._title = title;
    this._description = filmDescription;
    this._filmRange = filmRange;
    this._filmMark = filmMark;
    this._filmDate = filmDate;
    this._genre = genre;
    this._poster = poster;
    this._userComments = userComments;
    this._watchList = watchList;
    this._wached = watched;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._onAddToWatchListButtonClick = this._onAddToWatchListButtonClick.bind(this);
    this._onMarkAsWatchedButtonClick = this._onMarkAsWatchedButtonClick.bind(this);
  }

  _onEditButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _onAddToWatchListButtonClick(e) {
    e.preventDefault();
    return typeof this._onAddToWatchList === `function` && this._onAddToWatchList();
  }

  _onMarkAsWatchedButtonClick(e) {
    e.preventDefault();
    return typeof this._onMarkAsWatched === `function` && this._onMarkAsWatched();
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._onEditButtonClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._onAddToWatchListButtonClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._onMarkAsWatchedButtonClick);
  }
  unbind() {
    this._element.querySelector(`.film-card__comments`)
      .removeEventListener(`click`, this._onEditButtonClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .removeEventListener(`click`, this._onAddToWatchListButtonClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .removeEventListener(`click`, this._onMarkAsWatchedButtonClick);
  }

  update({userComments, watchList, watched}) {
    this._watchList = watchList;
    this._wached = watched;
    this._userComments = userComments;
  }

  get template() {
    const filmRange = moment.duration(this._filmRange, `m`);
    return `<article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._filmMark}</p>
          <p class="film-card__info">
            <span class="film-card__year">${moment(this._filmDate).year()}</span>
            <span class="film-card__duration">${filmRange.hours()}h ${filmRange.minutes()}m</span>
            <span class="film-card__genre">${this._genre[0]}</span>
          </p>
          <img src="${this._poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${this._description.join(`. `)}</p>
          <button class="film-card__comments">${this._userComments.length} comments</button> 

          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>
        </article>`;
  }
}


