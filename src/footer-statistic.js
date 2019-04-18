export default (films) => {
  const filmLength = films.length;
  document.querySelector(`.footer__statistics p`)
    .insertAdjacentText(`afterbegin`, `${filmLength}`);
};
