
((module) => {
	'use strict';

	var TreeCopier = require('x-iterable-tree/tree-copier');

	module.exports = createClass;

	const TRANSFORM_METHODS = (desc) => {

		return {
			initialize: desc.initialize,
			finalize: desc.finalize,
			process() {}
		}

	};

	function createClass(map, ...methods) {

		if (typeof map !== 'object' || !map) {
			map = new WeakMap();
		}

		class ObjectCloner extends TreeCopier {

			super(...methods.map(TRANSFORM_METHODS));

		}

		return class extends ObjectCloner {};

	}

})(module);
