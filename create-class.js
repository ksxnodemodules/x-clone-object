
((module) => {
	'use strict';

	var TreeCopier = require('x-iterable-tree/tree-copier');

	module.exports = createClass;

	const TRANSFORM_METHODS = (map) => (desc) => {

		var _process = desc.process;

		return {
			initialize: desc.initialize,
			finalize: desc.finalize,
			process(...args) {
				var base = _process(...args);
				if (base) {
					let deeper = base.deeper;
					var _get = base.get;
					let result = {
						value: base.value,
						deeper: deeper,
						set: desc.set
					};
					result.get = (key) =>
						map.get(key) || _get(value);
					return result;
				}
			}
		};

	};

	function createClass(map, ...methods) {

		if (typeof map !== 'object' || !map) {
			map = new WeakMap();
		}

		class ObjectCloner extends TreeCopier {

			super(...methods.map(TRANSFORM_METHODS(map)));

		}

		return class extends ObjectCloner {};

	}

})(module);
