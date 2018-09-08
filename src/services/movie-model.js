/* Model for Movie Data */
_GLOBAL_MODULE.MovieModel = (function () {

	'use strict';

	function Movie(data) {
		this.title = data.movie_title;
		this.directorName = data.director_name;
		this.actor1Name = data.actor_1_name;
		this.actor2Name = data.actor_2_name;
		this.genres = data.genres.split('|').join(' | ');
		this.language = data.language;
		this.country = data.country;
		this.contentRating = data.content_rating;
		this.budget = data.budget;
		this.titleYear = data.title_year;
		this.plotKeywords = data.plot_keywords.split('|').join(' | ');
		this.movieImdbLink = data.movie_imdb_link;
	}

	return Movie;

}());