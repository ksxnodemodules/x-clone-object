
((module) => {
	'use strict';

	var TreeCopier = require('x-iterable-tree/tree-copier');

	module.exports = createClass;

	function createClass(map) {

		if (typeof map !== 'object' || !map) {
			map = new WeakMap();
		}

		class ObjectCloner extends TreeCopier {

		}

		return class extends ObjectCloner {};

	}

})(module);
