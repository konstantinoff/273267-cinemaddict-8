import addFilter from "./navigation-template";
import filmData from "./data";
import FilmCardTemplate from "./film-card";
import GetFilmPopUp from "./film-popup";

const FAVORITES_AMOUNT = 8;
const HISTORY_AMOUNT = 4;
const WATCHLIST_AMOUNT = 13;
const ALL_MOVIES_AMOUNT = 21;
const navBar = document.querySelector(`.main-navigation`);
const filmContainer = document.querySelector(`.films-list__container`);
const body = document.querySelector(`body`);
const cardTemplate = new FilmCardTemplate(filmData);
const popUpTemplate = new GetFilmPopUp(filmData);

const render = () => {
  cardTemplate.render();
  filmContainer.appendChild(cardTemplate.element);
  cardTemplate.onClick = () => {
    popUpTemplate.render();

    body.appendChild(popUpTemplate.element);
    cardTemplate.unbind();
  };
  popUpTemplate.onSubmit = (newData) => {
    filmData.userRating = newData.userRating;
    filmData.userComments = newData.userComments;
    cardTemplate.update(filmData);
    popUpTemplate.update(filmData);


    let oldCard = cardTemplate.element;
    cardTemplate.render();
    cardTemplate.bind();
    filmContainer.replaceChild(cardTemplate.element, oldCard);
    popUpTemplate.unrender();
  };

  popUpTemplate.onClick = () => {
    popUpTemplate.unrender();
    cardTemplate.bind();
  };

  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`Favorites`, FAVORITES_AMOUNT));
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`History`, HISTORY_AMOUNT));
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`Watchlist`, WATCHLIST_AMOUNT));
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`All movies`, ALL_MOVIES_AMOUNT));
};

render();
