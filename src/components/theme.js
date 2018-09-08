(function (_GLOBAL_MODULE) {
	'use strict';

	function setup() {
		var themeButton = document.getElementById('theme-button');
		themeButton.addEventListener('click', function (event) {
			if (themeButton.getAttribute('theme') === 'dark-theme') {
				themeButton.setAttribute('theme', 'light-theme');
				themeButton.innerText = 'Dark Theme';
				document.body.className = 'light-theme';
			} else {
				themeButton.setAttribute('theme', 'dark-theme');
				themeButton.innerText = 'Light Theme';
				document.body.className = 'dark-theme';
			}
		});
	}


	_GLOBAL_MODULE.themeComponent = {
		setup: setup
	};

})(_GLOBAL_MODULE);