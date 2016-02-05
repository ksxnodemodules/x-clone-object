
((module) => {
	'use strict';

	var ObjectIterable = require('x-object-iterable');

	var createobj = Object.create;
	var defpro = Object.defineProperty;
	var freezeobj = Object.freeze;
	var getproto = Object.getPrototypeOf;
	var objproto = Object.prototype;

	var _return = (value) => () => value;

	const RETURN = freezeobj({
		set(container, element) {
			defpro(container, element.descriptor);
		}
	});

	const CLONE_OBJECT = freezeobj({
		process(object) {
			var proto = getproto(object);
			if (proto === objproto || proto === null) {
				return {
					value: new ObjectIterable(object),
					get: _return(createobj(proto)),
					__proto__: RETURN
				};
			}
		}
	});

	module.exports = CLONE_OBJECT;

})(module);
