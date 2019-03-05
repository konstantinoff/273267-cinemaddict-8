import addFilter from "./navigation-template";
import addCard from "./film-card-template";
import getFilm from "./get-film";

const navBar = document.querySelector(`.main-navigation`);
const filmContainer = document.querySelector(`.films-list__container`);
const extraFilms = document.querySelectorAll(`.films-list--extra .films-list__container`);
const FAVORITES_AMOUNT = 8;
const HISTORY_AMOUNT = 4;
const WATCHLIST_AMOUNT = 13;
const ALL_MOVIES_AMOUNT = 21;

const renderCard = (dist, CARDS_AMOUNT = 7) => {
  const tasks = new Array(CARDS_AMOUNT)
    .fill(``)
    .map(() => addCard(getFilm()));
  dist.innerHTML = ``;
  dist.insertAdjacentHTML(`beforeend`, tasks.join(``));
};

const render = () =>{
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`Favorites`, FAVORITES_AMOUNT));
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`History`, HISTORY_AMOUNT));
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`Watchlist`, WATCHLIST_AMOUNT));
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`All movies`, ALL_MOVIES_AMOUNT));
  renderCard(filmContainer);
  const filter = document.querySelectorAll(`.main-navigation__item`);
  extraFilms.forEach((element) => renderCard(element, 2));
  filter.forEach((element) => element.addEventListener(`click`, () => {
    const RANDOM_CARDS_AMOUNT = Math.floor(Math.random() * 7) + 1;
    filmContainer.innerHTML = ``;
    renderCard(filmContainer, RANDOM_CARDS_AMOUNT);
  }));
};

render();
