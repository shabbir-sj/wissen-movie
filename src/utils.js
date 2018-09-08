_GLOBAL_MODULE.utils = {
	cleanEverythingFromHTML: function (node) {
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}
};