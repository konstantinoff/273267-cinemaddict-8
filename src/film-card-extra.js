import Component from './component';
import moment from 'moment';

export default class ExtraGetFilmCard extends Component {
  constructor({title, description, runtime, rating, filmDate, genre, poster, userComments}) {
    super();
    this._title = title;
    this._description = description;
    this._filmRange = runtime;
    this._rating = rating;
    this._filmDate = filmDate;
    this._genre = genre;
    this._poster = poster;
    this._userComments = userComments;
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
    const filmRange = moment.duration(this._filmRange, `m`);
    return `<article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${moment(this._filmDate).year()}</span>
            <span class="film-card__duration">${filmRange.hours()}h ${filmRange.minutes()}m</span>
            <span class="film-card__genre">${this._genre[0]}</span>
          </p>
          <img src="${this._poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${this._description}</p>
          <button class="film-card__comments">${this._userComments.length} comments</button> 
        </article>`;
  }
}


