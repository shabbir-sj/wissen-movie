/*
 Controller to manage game list action and data
 */


(function (_GLOBAL_MODULE) {
	'use strict';

	var errorDiv = document.getElementById('error-msg');
	var loader = document.getElementById('list-spinner');

	var movieService =  _GLOBAL_MODULE.movieService;
	var utils = _GLOBAL_MODULE.utils;
	var paginationComponent = _GLOBAL_MODULE.paginationComponent;
	var themeComponent = _GLOBAL_MODULE.themeComponent;

	var movies, _currentPage = 1;
	var headData = movieService.getHeadData();

	function showHideLoader(show) {
		loader.className = show ? 'show': 'hide';
	}

	// Reset sort
	function resetSort(headItem) {
		for (var i = 0; i < headData.length; ++i) {
			if (headData[i].enable) {
				if (headItem && headItem.key === headData[i].key) {
					headData[i].sort = !headData[i].sort;
				} else {
					headData[i].sort = null;
				}
			}
		}
	}

	// Sort list
	function sortList(headItem) {

		if (!movies)
			return;

		var sortedList;
		if (headItem.key === 'budget' || headItem.key === 'titleYear') {
			sortedList = movies.sort(function (item1, item2) {
				var a = parseInt(item1[headItem.key] || 0), b = parseInt(item2[headItem.key] || 0);
				return headItem.sort ? (a - b) : (b - a);
			});
		} else {
			sortedList = movies.sort(function (item1, item2) {
				var a = item1[headItem.key], b = item2[headItem.key];
				if (a == b)
					return 0;
				return (headItem.sort) ? ((a < b) ? -1 : 1) : ((a > b) ? -1 : 1);
			});
		}

		createTableUI(sortedList);
	}

	// filter list by page
	function filterList(currentPage) {
		_currentPage = currentPage;
		fetchList(currentPage, headData);
	}

	function appendtd(tr, text) {
		var td = document.createElement('td');
		td.innerText = text;
		tr.appendChild(td);
	}

	function appendi(parent, faClass, headItem) {
		var i = document.createElement('i');
		i.className = 'fa ' + faClass;
		parent.appendChild(i);

		i.addEventListener('click', function(event) {
			resetSort(headItem);
			sortList(headItem);
		})
	}

	function addSortUI(headItem, parentNode) {
		if (headItem.sort == null) {
			appendi(parentNode, 'fa-caret-up', headItem);
			appendi(parentNode, 'fa-caret-down', headItem);
		} else if (headItem.sort) {
			appendi(parentNode, 'fa-caret-up', headItem);
		} else {
			appendi(parentNode, 'fa-caret-down', headItem);
		}
	}

	function addFilterUI(headItem, parentNode) {
		var input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('name', headItem.key);
		input.value = headItem.filter || '';
		input.placeholder = 'type and enter';
		input.title = 'type and enter to see result';
		input.addEventListener('keyup', function (event) {
			if (event.keyCode == 13 && event.target.tagName === 'INPUT') {
				headItem.filter = event.target.value;
				resetSort();
				_currentPage = 1;
				fetchList(_currentPage, headData);
			}
		});
		parentNode.appendChild(input);
	}

	// create th element with sorting support
	function appendth(tr, headItem) {
		var th = document.createElement('th');
		var div1 = document.createElement('div');
		div1.style.position = 'relative';
		var span = document.createElement('span');
		span.innerText = headItem.title;
		div1.appendChild(span);
		th.appendChild(div1);

		if (headItem.enable) {
			addSortUI(headItem, div1);

			var div2 = document.createElement('div');
			addFilterUI(headItem, div2);
			th.appendChild(div2);
		}

		tr.appendChild(th);
	}

	function createTableHead() {
		var thead = document.querySelector('#movie-table-head');
		utils.cleanEverythingFromHTML(thead);

		var tr = document.createElement('tr');
		for (var i = 0; i < headData.length; ++i) {
			appendth(tr, headData[i]);
		}
		thead.appendChild(tr);
	}

	function createTableBody(list) {
		var tbody = document.querySelector('#movie-table-body');
		utils.cleanEverythingFromHTML(tbody);

		var i, tr, movie;
		for (i = 0; i < list.length; ++i) {
			movie = list[i];
			tr = document.createElement('tr');
			appendtd(tr, movie.title);
			appendtd(tr, movie.directorName);
			appendtd(tr, movie.actor1Name);
			appendtd(tr, movie.actor2Name);
			appendtd(tr, movie.genres);
			appendtd(tr, movie.language);
			appendtd(tr, movie.country);
			appendtd(tr, movie.contentRating);
			appendtd(tr, movie.budget);
			appendtd(tr, movie.titleYear);
			appendtd(tr, movie.plotKeywords);
			appendtd(tr, movie.movieImdbLink);
			tbody.appendChild(tr);
		}
	}

	function createTableUI(movies) {
		createTableHead();
		createTableBody(movies);
	}

	// create table and store data
	function handleListResponse(res) {
		window.scrollTo(0, 0);
		utils.cleanEverythingFromHTML(errorDiv);
		movies = res.data;
		createTableUI(movies);

		paginationComponent.setUI(res.maxSize, _currentPage);
	}

	// Show error message
	function handleListError(error) {
		utils.cleanEverythingFromHTML(errorDiv);
		var div = document.createElement('div');
		div.className = 'error-msg';
		div.innerText = (error.status == -1)
			? 'This request has been blocked; the content must be served over HTTPS.'
			: 'Something went wrong';
		errorDiv.appendChild(div);
	}

	// Fetch movie list from server
	function fetchList(page, filterData) {
		showHideLoader(true);
		movieService.fetchMovies(page, filterData)
			.then(handleListResponse)
			.catch(handleListError)
			.finally(function () {
				showHideLoader(false);
			});
	}

	// Initial setups for pagination and theme
	(function () {
		paginationComponent.init(filterList);
		themeComponent.setup();
		fetchList();

	})();

})(_GLOBAL_MODULE);