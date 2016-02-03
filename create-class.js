
((module) => {
	'use strict';

	var XIterable = require('x-iterable/create-class');
	class TreeCopier extends require('x-iterable-tree/tree-copier') {}

	createClass.prototype = TreeCopier.prototype;
	createClass.Super = createClass.Base = createClass.TreeCopier = TreeCopier;

	module.exports = createClass;

	const TRANSFORM_METHODS = (desc) => new Method(desc);

	function createClass(mkmap, ...methods) {

		if (typeof Map !== 'function') {
			mkmap = createClass.DEFAULT_MKMAP;
		}

		methods = new SetOfMethods(methods);

		class ObjectCloner extends TreeCopier {

			constructor() {
				super(...methods.transform(TRANSFORM_METHODS));
			}

			create(source) {
				this.map = mkmap();
				return super.create(source);
			}

			static addMethods(...args) {
				methods.push(...args);
			}

			static removeMethods(...args) {
				methods.remove(...args);
			}

			static get numberOfMethods() {
				return methods.size;
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

		remove(...elements) {
			elements.forEach((element) => this.delete(element));
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
			var lval = this.value = base.value;
			if (map.has(lval)) {
				this.deeper = false;
			} else {
				var rval = base.get(lval);
				map.set(lval, rval);
				this.deeper = base.deeper;
				this.get = () => rval;
				this.set = base.set;
			}

		}
	};

})(module);
