(function (_GLOBAL_MODULE) {

	var Movie = _GLOBAL_MODULE.MovieModel;
	var http = _GLOBAL_MODULE.http;

	/*
	 Movie Service: Handling server requests
	 */

	function MovieService() {

		var pageSize = 10;
		var self = this;
		self.languages = ['English', 'Japanese', 'Aboriginal'];
		self.countries = [];

		/*
		 Public Methods
		 */
		self.fetchMovies = fetchMovies;
		self.getHeadData = getHeadData;

		var baseUrl = window.location.origin + '/api';

		function getHeadData() {
			return [
				{
					title: 'Title',
					key: 'title'
				},
				{
					title: 'Director',
					key: 'directorName'
				},
				{
					title: 'Actor 1',
					key: 'actor1Name'
				},
				{
					title: 'Actor 2',
					key: 'actor2Name'
				},
				{
					title: 'genres',
					key: 'genres',
					sort: null,
					filter: '',
					enable: true
				},
				{
					title: 'language',
					key: 'language',
					sort: null,
					filter: '',
					enable: true
				},
				{
					title: 'country',
					key: 'country',
					sort: null,
					filter: '',
					enable: true
				},
				{
					title: 'Content rating',
					key: 'contentRating'
				},
				{
					title: 'budget',
					key: 'budget',
					sort: null,
					filter: '',
					enable: true
				},
				{
					title: 'Title Year',
					key: 'titleYear',
					sort: null,
					filter: '',
					enable: true
				},
				{
					title: 'Plot keywords',
					key: 'plotKeywords'
				},
				{
					title: 'Imdb Link',
					key: 'movieImdbLink'
				}
			];
		}
		/*
		 Convert each object received from api to our game model.
		 */
		function initializeObjList(movies) {

			var countyMap = {};

			self.movies = [];

			if (!movies) {
				console.warn("Movie list not provided, returning");
				return;
			}

			for (var i = 0; i < movies.length; i++) {
				self.movies.push(new Movie(movies[i]));
				if (self.movies[i].country)
					countyMap[self.movies[i].country] = 0;
			}
			Array.prototype.push.apply(self.countries, Object.keys(countyMap));
		}

		/*
		 Filter by page
		 */
		function getMovie(page, filterData) {
			if (!self.movies)
				return;

			filterData = filterData|| [];
			var filters = filterData.filter(function (item) {
				return item.enable && item.filter && item.filter.length;
			});

			var filteredResult;
			if (!filters.length) {
				filteredResult = self.movies;
			} else {
				filteredResult = self.movies.filter(function (item) {
					var i, source, tobefind;
					for (i = 0; i < filters.length; ++i) {
						source = item[filters[i].key].toLowerCase();
						tobefind = filters[i].filter.trim().toLowerCase();
						if (source.indexOf(tobefind) !== -1)
							return true;
					}
				});
			}

			page = page || 1;

			var startIndex = (page-1)*pageSize;
			var filteredPage = 	filteredResult.slice(startIndex, startIndex + pageSize);
			return {
				data: filteredPage,
				originalList: self.movies,
				maxSize: filteredResult.length
			}
		}

		/*
		 Fetch Movie List
		 */
		function fetchMovies(page, filterData) {

			if (self.movies) {
				return Promise.resolve(getMovie(page, filterData));
			}

			var headers = {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			};

			return request = http.doRequest(
				'GET',
				baseUrl,
				null,
				headers
			).then(function (response) {
				// Convert site data to model list
				initializeObjList(response.data);
				return getMovie();
			}).catch(function (error) {
				console.error('Fail to fetch movie List', error);
				return $q.reject(error);
			})

		}

	}

	_GLOBAL_MODULE.movieService = new MovieService();

})(_GLOBAL_MODULE);