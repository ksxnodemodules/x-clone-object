
((module) => {
	'use strict';

	module.exports = {
		createClass: require('./create-class.js'),
		CLONE_OBJECT: require('./clone-object.js'),
		CLONE_ARRAY: require('./clone-array.js'),
		CLONE_SET: require('./clone-set.js'),
		CLONE_MAP: require('./clone-map.js'),
		OASM: require('./oasm.js')
	};

})(module);
