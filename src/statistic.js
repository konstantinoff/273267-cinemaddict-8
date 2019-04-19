import moment from 'moment';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Component from './component';


export default class Statistic extends Component {
  constructor(data) {
    super();
    this._watched = data.filter((it) => it.alreadyWatched === true);
    this._currentPeriod = `all_time`;

    this._onStatisticRender = this._onStatisticRender.bind(this);
    this._drawFilteredStatistic = this._drawFilteredStatistic.bind(this);
  }

  render() {
    this._element = Component.createElement(this.template);
    this._statisticTextRender();
    this.bind();
    return this._element;
  }

  filterPeriod() {
    let filtered;
    switch (this._currentPeriod) {
      case `all_time`: default:
        filtered = this._watched.filter((it) => it.alreadyWatched);
        break;
      case `today`:
        filtered = this._watched.filter((it) => it.watchingData ? moment(it.watchingData).isAfter(moment().startOf(`day`)) : false);
        break;

      case `week`:
        filtered = this._watched.filter((it) => it.watchingData ? moment(it.watchingData).isAfter(moment().subtract(7, `days`)) : false);
        break;

      case `month`:
        filtered = this._watched.filter((it) => it.watchingData ? moment(it.watchingData).isAfter(moment().subtract(1, `months`)) : false);
        break;

      case `year`:
        filtered = this._watched.filter((it) => it.watchingData ? moment(it.watchingData).isAfter(moment().subtract(1, `year`)) : false);
        break;
    }
    const allGenres = filtered.reduce((acc, film) => acc.concat(film.genre), []);
    const topGenre = allGenres.reduce((acc, item) => {
      if (acc[item]) {
        acc[item]++;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});
    return {
      filtered,
      genres: Object.entries(topGenre).sort((a, b) => b[1] - a[1]),
      duration: filtered.reduce((acc, film) => acc + film.runtime, 0)
    };
  }


  statisticDraw() {
    this._element.querySelector(`.statistic__chart-wrap`)
      .innerHTML = `<canvas class="statistic__chart" width="1000"></canvas>`;
    const statisticCtx = document.querySelector(`.statistic__chart`);
    const BAR_HEIGHT = 50;
    statisticCtx.height = BAR_HEIGHT * 5;
    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this.filterPeriod().genres.map((it) => it[0]),
        datasets: [{
          data: this.filterPeriod().genres.map((it) => it[1]),
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

  _statisticTextRender() {
    this._element.querySelector(`.statistic__text-list`).innerHTML = `
     <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${this.filterPeriod().filtered.length} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${Math.floor(this.filterPeriod().duration / 60)} <span class="statistic__item-description">h</span> ${this.filterPeriod().duration % 60} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${this.filterPeriod().genres.length ? this.filterPeriod().genres[0][0] : ``}</p>
	  </li>`;
  }

  _drawFilteredStatistic(e) {
    this._currentPeriod = e.target.value;
    this._statisticTextRender();
    this.statisticDraw();
  }

  _onStatisticRender(e) {
    e.preventDefault();
    this._currentPeriod = `all_time`;
    return typeof this._onStatisticRender === `function` && this._onStatisticRender();
  }

  bind() {
    this._element.querySelector(`.statistic__filters`)
      .addEventListener(`change`, this._drawFilteredStatistic);
    document.querySelector(`.main-navigation__item--additional`)
      .addEventListener(`click`, this._onStatisticRender);
  }

  unbind() {
    document.querySelector(`.main-navigation__item--additional`)
      .removeEventListener(`click`, this._onStatisticRender);
  }


  get template() {
    return `<section class="statistic">
  <p class="statistic__rank">Your rank <span class="statistic__rank-label">Sci-Fighter</span></p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all_time" checked>
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
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>
  
</section>`;
  }
}
