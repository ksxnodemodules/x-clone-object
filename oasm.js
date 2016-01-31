
((module) => {
	'use strict';

	var createClass = require('./create-class.js');
	const CLONE_OBJECT = require('./clone-object.js');
	const CLONE_ARRAY = require('./clone-array.js');
	const CLONE_SET = require('./clone-set.js');
	const CLONE_MAP = require('./clone-map.js');

	class OASM extends createClass(createClass.DEFAULT_MKMAP, CLONE_OBJECT, CLONE_ARRAY, CLONE_SET, CLONE_MAP) {}

	module.exports = class extends OASM {};

})(module);
