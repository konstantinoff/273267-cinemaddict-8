const TITLE_AMOUNT = 1;
const GENRE_AMOUNT = 1;
const YEARS_RANGE = -50;
const postersArray = [`accused`, `blackmail`, `blue-blazes`, `fuga-da-new-york`, `moonrise`, `three-friends`];
const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `);
const getRandomArrayElements = (array, elementsAmount) => Array.from(array).sort(() => 0.5 - Math.random()).slice(0, elementsAmount);
const getRandomTimestamp = () => new Date(Date.now() + 1 + Math.floor(Math.random() * YEARS_RANGE) * 12 * 30 * 24 * 60 * 60 * 1000);
const getRandomMark = () => (Math.random() * 10).toFixed(1);
const getRandomFilmRange = () => Math.floor(Math.random() * 180) + 60;


const task = () => ({
  title: getRandomArrayElements([
    `Побег из Шоушенка`,
    `Зеленая миля`,
    `Форрест Гамп`,
    `Список Шиндлера`,
    `1+1`,
    `Леон`,
    `Начало`,
    `Король Лев`,
    `Бойцовский клуб`,
    `Иван Васильевич меняет профессию`,
    `Жизнь прекрасна`,
  ], TITLE_AMOUNT),
  filmDescription: getRandomArrayElements(description, 3),
  filmRange: getRandomFilmRange(),
  filmMark: getRandomMark(),
  filmDate: getRandomTimestamp(),
  genre: getRandomArrayElements(new Set([
    `Action`,
    `Adventure`,
    `Comedies`,
    `Crime`,
    `Dramas`,
    `Epics`]), GENRE_AMOUNT),
  poster: `images/posters/${getRandomArrayElements(postersArray, 1)}.jpg`
});


export default task;
