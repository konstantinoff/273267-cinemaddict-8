export default (getFilm) => {
  const randomYear = getFilm.filmDate.getFullYear();
  const filmHours = Math.floor((getFilm.filmRange / 60));
  const filmMinutes = getFilm.filmRange % 60;
  return `<article class="film-card">
          <h3 class="film-card__title">${getFilm.title}</h3>
          <p class="film-card__rating">${getFilm.filmMark}</p>
          <p class="film-card__info">
            <span class="film-card__year">${randomYear}</span>
            <span class="film-card__duration">${filmHours}h ${filmMinutes}m</span>
            <span class="film-card__genre">${getFilm.genre}</span>
          </p>
          <img src="${getFilm.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${getFilm.filmDescription.join(`. `)}</p>
          <button class="film-card__comments">13 comments</button>

          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>
        </article>`;
};
