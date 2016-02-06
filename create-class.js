
((module, undefined) => {
	'use strict';

	var XIterable = require('x-iterable/create-class');
	class TreeCopier extends require('x-iterable-tree/tree-copier') {}

	createClass.prototype = TreeCopier.prototype;
	createClass.Super = createClass.Base = createClass.TreeCopier = TreeCopier;

	module.exports = createClass;

	const TRANSFORM_METHODS = (desc) => createMethod(desc);

	function createClass(mkmap, ...methods) {

		if (typeof Map !== 'function') {
			mkmap = createClass.DEFAULT_MKMAP;
		}

		methods = new SetOfMethods(methods);

		//	methods: array:
		//		struct:
		//			optional function initialize:
		//				returns: void;
		//				takes:
		//					void this;
		//					TreeCopier self;
		//			optional function finalize:
		//				returns: void;
		//				takes:
		//					void this;
		//					Container container;
		//					TreeCopier self;
		//			function process:
		//				returns: either:
		//					struct:
		//						Value value;
		//						optional Iterable? getIterable(Value value);
		//						void set(Container container, Value value);
		//					void;
		//				takes:
		//					void this;
		//					Value object;
		//					ObjectCloner self;

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

	var createMethod = (desc) => ({
		process(value, self) {
			var map = self.map;
			var result = map.get(value);
			if (result) {
				return result;
			}
			result = desc.process(value, self);
			if (result) {
				return new createMethod.Process(result, map);
			}
		},
		__proto__: desc
	});

	createMethod.Process = function (base, map) {
		var lval = this.value = base.value;
		map.set(lval, this);
		this.set = base.set;
		var getIterable = base.getIterable;
		return {
			iterable: typeof getIterable === 'function' && getIterable(lval),
			__proto__: this
		};
	};

	createMethod.Process.prototype.iterable = undefined;

})(module);
