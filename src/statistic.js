import Component from './component';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


export default class Statistic extends Component {
  constructor(data) {
    super();
    this._watched = data.filter((it) => it.watched === true);
    this._duration = this._watched.reduce((acc, film) => acc + film.filmRange, 0);
    const allGenres = this._watched.reduce((acc, film) => acc.concat(film.genre), []);
    const topGenre = allGenres.reduce((acc, item) => {
      if (acc[item]) {
        acc[item]++;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});
    this._genresSorted = Object.entries(topGenre).sort((a, b) => b[1] - a[1]);
    this._onStatisticRender = this._onStatisticRender.bind(this);
  }
  statisticDraw() {
    const statisticCtx = document.querySelector(`.statistic__chart`);
    const BAR_HEIGHT = 50;
    statisticCtx.height = BAR_HEIGHT * 5;
    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._genresSorted.map((it) => it[0]),
        datasets: [{
          data: this._genresSorted.map((it) => it[1]),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
    return myChart;
  }

  set onStatisticRender(fn) {
    this._onStatisticRender = fn;
  }

  _onStatisticRender(e) {
    e.preventDefault();
    return typeof this._onStatisticRender === `function` && this._onStatisticRender();
  }

  bind() {
    document.querySelector(`.main-navigation__item--additional`)
      .addEventListener(`click`, this._onStatisticRender);
  }

  unbind() {
    document.querySelector(`.main-navigation__item--additional`)
      .removeEventListener(`click`, this._onStatisticRender);
  }

  update(data) {
    this._watched = data.filter((it) => it.watched === true);
    this._duration = this._watched.reduce((acc, film) => acc + film.filmRange, 0);
    const allGenres = this._watched.reduce((acc, film) => acc.concat(film.genre), []);
    const topGenre = allGenres.reduce((acc, item) => {
      if (acc[item]) {
        acc[item]++;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});
    this._genresSorted = Object.entries(topGenre).sort((a, b) => b[1] - a[1]);
  }


  get template() {
    return `<section class="statistic">
  <p class="statistic__rank">Your rank <span class="statistic__rank-label">Sci-Fighter</span></p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${this._watched.length} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${Math.floor(this._duration / 60)} <span class="statistic__item-description">h</span> ${this._duration % 60} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${this._genresSorted.length ? this._genresSorted[0][0] : ``}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>
  
</section>`;
  }
}
