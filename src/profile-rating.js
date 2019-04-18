export default (films) => {
  const WatchedFilmsAmount = films.filter((it) => it.alreadyWatched === true).length;
  const profileRating = () => {
    switch (true) {
      case (WatchedFilmsAmount <= 10):
        return `novice`;
      case (WatchedFilmsAmount <= 20):
        return `fan`;

      case (WatchedFilmsAmount > 20):
        return `movie buff`;
      default:
        return `Show adept`;
    }
  };

  const i = profileRating();
  document.querySelector(`.profile__rating`)
    .insertAdjacentText(`afterbegin`, `${i}`);
};

