
((module) => {
	'use strict';

	var ObjectIterable = require('x-object-iterable');

	var getproto = Object.getPrototypeOf;
	var objproto = Object.prototype;

	const CLONE_OBJECT = Object.freeze({
		process(object) {
			var proto = getproto(object);
			if (proto === objproto || proto === null) {
				
			}
		}
	});

	module.exports = CLONE_OBJECT;

})(module);