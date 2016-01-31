
((module) => {
	'use strict';

	module.exports = {
		createClass: require('./create-class.js'),
		CLONE_OBJECT: require('./clone-object.js'),
		CLONE_ARRAY: require('./clone-array'),
		CLONE_SET: require('./clone-set'),
		CLONE_MAP: require('./clone-map'),
		OASM: require('./oasm.js')
	};

})(module);
