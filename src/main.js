import addFilter from "./navigation-template";
import filmData from "./get-film-data";
import FilmCardTemplate from "./film-card-template";
import GetFilmPopUp from "./get-film-popup";

const FAVORITES_AMOUNT = 8;
const HISTORY_AMOUNT = 4;
const WATCHLIST_AMOUNT = 13;
const ALL_MOVIES_AMOUNT = 21;
const navBar = document.querySelector(`.main-navigation`);
const filmContainer = document.querySelector(`.films-list__container`);
const body = document.querySelector(`body`);
const cardTemplate = new FilmCardTemplate(filmData);
const popUpTemplate = new GetFilmPopUp(filmData);

const rendering = () =>{
  filmContainer.appendChild(cardTemplate.render());
  cardTemplate.onClick = () => {
    popUpTemplate.render();
    body.appendChild(popUpTemplate.element);
  };
  popUpTemplate.onClick = () => {
    body.removeChild(popUpTemplate.element);
  };
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`Favorites`, FAVORITES_AMOUNT));
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`History`, HISTORY_AMOUNT));
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`Watchlist`, WATCHLIST_AMOUNT));
  navBar.insertAdjacentHTML(`afterbegin`, addFilter(`All movies`, ALL_MOVIES_AMOUNT));
};

rendering();
