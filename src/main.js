import filmData from "./data";
import FilmCardTemplate from "./film-card";
import GetFilmPopUp from "./film-popup";
import Filter from './filter';
import Statistic from './statistic';

const navBar = document.querySelector(`.main-navigation`);
const filmContainer = document.querySelector(`.films-list__container`);
const filters = [[`All movies`, 5], [`Watchlist`, 6], [`History`, 7], [`Favorites`, 8]].reverse();


const body = document.querySelector(`body`);
const updateCards = (cards, cardToUpdate, newCard) => {
  const index = cards.findIndex((it) => it === cardToUpdate);
  cards[index] = Object.assign({}, cardToUpdate, newCard);
  return cards[index];

};
const filterCards = (filterName) => {
  switch (filterName) {
    case `All movies`:
      return filmData;

    case `Watchlist`:
      return filmData.filter((it) => it.watchList === true);

    case `History`:
      return filmData.filter((it) => it.watched === true);
    default:
      return filmData;
  }
};


const render = () => {
  const statistic = new Statistic(filmData);
  statistic.bind();
  statistic.onStatisticRender = () => {
    filmContainer.innerHTML = ``;
    statistic.render();
    filmContainer.appendChild(statistic.element);
    statistic.statisticDraw();
  };

  const renderFilters = (filterList) => {
    for (let filter of filterList) {
      const filterTemplate = new Filter(filter);
      filterTemplate.render();
      navBar.insertAdjacentElement(`afterbegin`, filterTemplate.element);
      filterTemplate.onFilter = () => {
        const filteredCards = filterCards(filter[0]);
        renderCards(filteredCards);
      };
    }
  };
  const renderCards = (cards) => {
    filmContainer.innerHTML = ``;
    for (let card of cards) {
      const cardTemplate = new FilmCardTemplate(card);
      const popUpTemplate = new GetFilmPopUp(card);


      cardTemplate.render();
      filmContainer.appendChild(cardTemplate.element);
      cardTemplate.onClick = () => {
        popUpTemplate.render();
        body.appendChild(popUpTemplate.element);
        cardTemplate.unbind();
      };

      cardTemplate.onAddToWatchList = () => {
        card.watchList = !card.watchList;
        const updateCard = updateCards(cards, card);
        cardTemplate.update(updateCard);
      };

      cardTemplate.onMarkAsWatched = () => {
        card.watched = !card.watched;
        const updateCard = updateCards(cards, card);
        cardTemplate.update(updateCard);
      };


      popUpTemplate.onSubmit = (newData) => {
        const updateCard = updateCards(cards, card, newData);
        cardTemplate.update(updateCard);


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
    }
  };
  renderFilters(filters);
  renderCards(filmData);
};

render();
