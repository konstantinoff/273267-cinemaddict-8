export default class ModelCard {
  constructor(data) {
    this.id = data[`id`];
    this.alreadyWatched = data.user_details[`already_watched`];
    this.favorite = data.user_details[`favorite`];
    this.personalRating = data.user_details[`personal_rating`];
    this.watchlist = data.user_details[`watchlist`];
    this.userDetails = data[`user_details`];
    this.userComments = data[`comments`];
    this.actors = data.film_info[`actors`];
    this.ageRating = data.film_info[`age_rating`] || ``;
    this.alternativeTitle = data.film_info[`alternative_title`];
    this.description = data.film_info[`description`];
    this.director = data.film_info[`director`];
    this.genre = data.film_info[`genre`];
    this.poster = data.film_info[`poster`];
    this.filmDate = data.film_info.release[`date`];
    this.country = data.film_info.release[`release_country`];
    this.rating = data.film_info[`total_rating`];
    this.title = data.film_info[`title`];
    this.runtime = data.film_info[`runtime`];
    this.writers = data.film_info[`writers`];
  }

  toRAW() {
    return {
      'id': this.id,
      'user_details': {
        'watchlist': this.watchlist,
        'already_watched': this.alreadyWatched,
        'personal_rating': this.personalRating,
        'favorite': this.favorite
      },
      'comments': this.userComments,
    };
  }
  static parseCard(data) {
    return new ModelCard(data);
  }

  static parseCards(data) {
    return data.map(ModelCard.parseCard);
  }
}
