import addFilter from "./navigation_template";
import addCard from "./film_card_template";

const navBar = document.querySelector(`.main-navigation`);
const filmContainer = document.querySelector(`.films-list__container`);
const extraFilms = document.querySelectorAll(`.films-list--extra .films-list__container`);

const renderCard = (dist, CARDS_AMOUNT = 7) => {
  const films = new Array(CARDS_AMOUNT)
    .fill()
    .map(addCard);
  dist.insertAdjacentHTML(`beforeend`, films.join(``));
};

const render = () =>{
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`Favorites`, 8));
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`History`, 4));
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`Watchlist`, 13));
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`All movies`, 21));
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
