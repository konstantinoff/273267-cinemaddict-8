import filmData from "./data";
import FilmCardTemplate from "./film-card";
import GetFilmPopUp from "./film-popup";
import Filter from './filter';
import Statistic from './statistic';
import API from './api';
import ExtraFilmCardTemplate from './film-card-extra';

let cardToRenderPosition = 5;
let dataToRender;

const showMoreButton = document.querySelector(`.films-list__show-more`);
const navBar = document.querySelector(`.main-navigation`);
const filmsContainer = document.querySelector(`.films-list__container`);
const topRatedContainer = document.querySelectorAll(`.films-list--extra .films-list__container`)[0];
const mostCommendedContainer = document.querySelectorAll(`.films-list--extra .films-list__container`)[1];


const AUTHORIZATION = `Basic eo0w590ik29889a239j981`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const body = document.querySelector(`body`);

const filterCards = (filterName, store) => {
  switch (filterName) {
    case `All movies`:
      return store;

    case `Watchlist`:
      return store.filter((it) => it.watchlist === true);

    case `History`:
      return store.filter((it) => it.alreadyWatched === true);

    case `Favorites`:
      return store.filter((it) => it.favorite === true);

    default:
      return store;
  }
};


const render = () => {
  api.getCards()
    .then((cards) => (filmData.data = cards))
    .then(() => {
      dataToRender = filmData.data;
      showMoreCards(dataToRender);
      renderExtraCards(filmData.data);
      renderFilters(filmData.data);
      showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
    });

  const onShowMoreButtonClick = () => showMoreCards(dataToRender);

  const showMoreCards = (data) => {
    renderCards(data.slice(0, cardToRenderPosition));
    if (cardToRenderPosition >= data.length) {
      showMoreButton.removeEventListener(`click`, onShowMoreButtonClick);
      showMoreButton.classList.add(`visually-hidden`);
    }
    cardToRenderPosition += 5;
  };


  const renderFilters = (data) => {
    navBar.innerHTML = `<a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>`;
    const watchlistAmount = Array.from(data).filter((it) => it.watchlist === true).length;
    const historyAmount = Array.from(data).filter((it) => it.alreadyWatched === true).length;
    const favoritesAmount = Array.from(data).filter((it) => it.favorite === true).length;
    const filters = [[`All movies`], [`Watchlist`, watchlistAmount], [`History`, historyAmount], [`Favorites`, favoritesAmount]].reverse();
    for (let filter of filters) {
      const filterTemplate = new Filter(filter);
      filterTemplate.render();
      navBar.insertAdjacentElement(`afterbegin`, filterTemplate.element);
      filterTemplate.onFilter = () => {
        const filteredCards = filterCards(filter[0], filmData.data);
        showMoreButton.classList.remove(`visually-hidden`);
        dataToRender = filteredCards;
        showMoreButton.removeEventListener(`click`, onShowMoreButtonClick);
        showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
        cardToRenderPosition = 5;
        showMoreCards(dataToRender);
      };
    }
    const statistic = new Statistic(filmData.data);
    statistic.bind();
    statistic.onStatisticRender = () => {
      filmsContainer.innerHTML = ``;
      statistic.render();
      filmsContainer.appendChild(statistic.element);
      statistic.statisticDraw();
    };
  };
  const renderCards = (cards) => {
    filmsContainer.innerHTML = ``;
    for (let card of cards) {
      const cardTemplate = new FilmCardTemplate(card);
      const popUpTemplate = new GetFilmPopUp(card);


      cardTemplate.render();
      filmsContainer.appendChild(cardTemplate.element);
      cardTemplate.onClick = () => {
        popUpTemplate.render();
        body.appendChild(popUpTemplate.element);
        cardTemplate.unbind();
      };

      cardTemplate.onAddToWatchList = () => {
        card.watchlist = !card.watchlist;
        api.updateCard({id: card.id, data: card.toRAW()})
          .then((newData) => {
            popUpTemplate.update(newData);
            renderFilters(filmData.data);
          });
      };

      cardTemplate.onMarkAsWatched = () => {
        card.alreadyWatched = !card.alreadyWatched;
        api.updateCard({id: card.id, data: card.toRAW()})
          .then((newData) => {
            popUpTemplate.update(newData);
            renderFilters(filmData.data);
          });
      };
      cardTemplate.onAddToFavorite = () => {
        card.favorite = !card.favorite;
        api.updateCard({id: card.id, data: card.toRAW()})
          .then((newData) => {
            popUpTemplate.update(newData);
            renderFilters(filmData.data);
          });
      };


      popUpTemplate.onSubmit = () => {
        api.updateCard({id: card.id, data: card.toRAW()})
          .then(() => {
            console.log(`raw`, card.toRAW());
            let oldCard = cardTemplate.element;
            popUpTemplate.unrender();
            cardTemplate.render();
            cardTemplate.bind();
            filmsContainer.replaceChild(cardTemplate.element, oldCard);
          });
      };
      popUpTemplate.onClose = () => {
        popUpTemplate.unrender();
        cardTemplate.bind();
      };
    }
  };


  const renderExtraCards = (data) => {
    const mostCommended = data.sort((a, b) => b.userComments.length - a.userComments.length).slice(0, 2);
    const topRated = data.sort((a, b) => b.rating - a.rating).slice(0, 2);


    for (let card of topRated) {
      const cardTemplate = new ExtraFilmCardTemplate(card);
      const popUpTemplate = new GetFilmPopUp(card);


      cardTemplate.render();
      topRatedContainer.appendChild(cardTemplate.element);
      cardTemplate.onClick = () => {
        popUpTemplate.render();
        body.appendChild(popUpTemplate.element);
        cardTemplate.unbind();
      };

      popUpTemplate.onSubmit = () => {
        api.updateCard({id: card.id, data: card.toRAW()})
          .then((newCard) => {
            cardTemplate.update(newCard);
            let oldCard = cardTemplate.element;
            popUpTemplate.unrender();
            cardTemplate.render();
            cardTemplate.bind();
            topRatedContainer.replaceChild(cardTemplate.element, oldCard);
            cardToRenderPosition = 5;
            showMoreCards(filmData.data);
          });
      };
      popUpTemplate.onClick = () => {
        popUpTemplate.unrender();
        cardTemplate.bind();
      };
    }

    for (let card of mostCommended) {
      const cardTemplate = new ExtraFilmCardTemplate(card);
      const popUpTemplate = new GetFilmPopUp(card);


      cardTemplate.render();
      mostCommendedContainer.appendChild(cardTemplate.element);
      cardTemplate.onClick = () => {
        popUpTemplate.render();
        body.appendChild(popUpTemplate.element);
        cardTemplate.unbind();
      };

      popUpTemplate.onSubmit = () => {
        api.updateCard({id: card.id, data: card.toRAW()})
          .then((newCard) => {
            cardTemplate.update(newCard);
            let oldCard = cardTemplate.element;
            popUpTemplate.unrender();
            cardTemplate.render();
            cardTemplate.bind();
            mostCommendedContainer.replaceChild(cardTemplate.element, oldCard);
            cardToRenderPosition = 5;
            showMoreCards(filmData.data);
          });
      };
      popUpTemplate.onClick = () => {
        popUpTemplate.unrender();
        cardTemplate.bind();
      };
    }
  };
};

render();
