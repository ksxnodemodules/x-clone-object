
((module) => {
	'use strict';

	var XIterable = require('x-iterable/create-class');
	var TreeCopier = require('x-iterable-tree/tree-copier');

	module.exports = createClass;

	const TRANSFORM_METHODS = (desc) => new Method(desc);

	function createClass(mkmap, ...methods) {

		if (typeof Map !== 'function') {
			mkmap = createClass.DEFAULT_MKMAP;
		}

		class ObjectCloner extends TreeCopier {

			constructor() {
				super(...methods.map(TRANSFORM_METHODS));
			}

			create(source) {
				this.map = mkmap();
				return super.create(source);
			}

			static addMethod(...args) {
				methods.push(...args);
			}

		}

		return class extends ObjectCloner {};

	}

	createClass.DEFAULT_MKMAP = () => new WeakMap();

	class SetOfMethods extends XIterable(Set) {
		push(...elements) {
			elements.forEach((element) => this.add(element));
			return this.size;
		}
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
