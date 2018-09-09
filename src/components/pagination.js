
(function (_GLOBAL_MODULE) {
	'use strict';

	var paginationDiv = document.getElementById('pagination-ui');
	var utils = _GLOBAL_MODULE.utils;

	var _currentPage = 1, pageSize = 10, maxPages = 5;
	var paginator = _GLOBAL_MODULE.paginate;


	function init(filterListCallBack) {
		paginationDiv.addEventListener('click', function(event) {
			if (event.target.tagName === 'A') {
				_currentPage = parseInt(event.target.getAttribute('page'));
				filterListCallBack(_currentPage);
			}
		})
	}

	function appendPageItem(i, currentPage, page) {
		var div = document.createElement('div');
		if (i === currentPage) {
			div.className += ' active';
		}

		var a = document.createElement('a');
		a.setAttribute('page', page || i);
		a.innerText = i;
		div.appendChild(a);
		paginationDiv.appendChild(div);
	}

	function createPaginationUI(paginationData) {
		utils.cleanEverythingFromHTML(paginationDiv);

		if (paginationData.currentPage > paginationData.startPage) {
			appendPageItem('<', paginationData.currentPage, paginationData.currentPage-1);
		}

		for (var i = paginationData.startPage; i <= paginationData.endPage; ++i) {
			appendPageItem(i, paginationData.currentPage);
		}

		if (paginationData.currentPage < paginationData.endPage) {
			appendPageItem('>', paginationData.currentPage, paginationData.currentPage+1);
		}

	}

	function setUI(totalItems, currentPage) {
		if (!totalItems)
			return;

		var paginationData = paginator(totalItems, currentPage, pageSize, maxPages);
		createPaginationUI(paginationData);
	}

	_GLOBAL_MODULE.paginationComponent = {
		init: init,
		setUI: setUI
	};

})(_GLOBAL_MODULE);