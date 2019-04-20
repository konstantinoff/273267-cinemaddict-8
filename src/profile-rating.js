const NOVICE_FILM_RANGE = 10;
const FAN_FILM_RANGE = 20;


export default (films) => {
  const WatchedFilmsAmount = films.filter((it) => it.alreadyWatched === true).length;
  const profileRating = () => {
    switch (true) {
      case (WatchedFilmsAmount <= NOVICE_FILM_RANGE):
        return `novice`;
      case (WatchedFilmsAmount <= FAN_FILM_RANGE):
        return `fan`;

      case (WatchedFilmsAmount > FAN_FILM_RANGE):
        return `movie buff`;
      default:
        return `Show adept`;
    }
  };

  const i = profileRating();
  document.querySelector(`.profile__rating`)
    .insertAdjacentText(`afterbegin`, `${i}`);
};

