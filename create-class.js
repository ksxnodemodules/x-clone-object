
((module) => {
	'use strict';

	var TreeCopier = require('x-iterable-tree/tree-copier');

	module.exports = createClass;

	// const TRANSFORM_METHODS = (desc) => {

	// 	var _process = desc.process;

	// 	return {
	// 		initialize: desc.initialize,
	// 		finalize: desc.finalize,
	// 		process(value, self) {
	// 			var base = _process(value, self);
	// 			if (base) {
	// 				let deeper = base.deeper;
	// 				var _get = base.get;
	// 				let result = {
	// 					value: base.value,
	// 					deeper: deeper,
	// 					set: desc.set
	// 				};
	// 				let map = self.map;
	// 				result.get = (key) =>
	// 					map.get(key) || _get(value);
	// 				return result;
	// 			}
	// 		}
	// 	};

	// };

	const TRANSFORM_METHODS = (desc) => new Method(desc);

	function createClass(Map, ...methods) {

		if (typeof Map !== 'function') {
			Map = WeakMap;
		}

		class ObjectCloner extends TreeCopier {

			constructor() {
				super(...methods.map(TRANSFORM_METHODS));
			}

			create(source) {
				this.map = new Map();
				return super.create(source);
			}

			static addMethod(...args) {
				methods.push(...args);
			}

		}

		return class extends ObjectCloner {};

	}

	class Method {

		constructor(desc) {
			this.initialize = desc.initialize;
			this.finalize = desc.finalize;
			this._process = desc.process;
		}

		process(value, self) {
			var base = this._process(value, self);
			if (base) {
				return new Method.Process(base, self.map);
			}
		}

	}

	Method.Process = class {
		constructor(base, map) {
			var deeper = base.deeper;
			var _get = base.get;
			this.value = base.value;
			this.deeper = deeper;
			this.get = (key) =>
				map.get(key) || _get(value);
		}
	};

})(module);
