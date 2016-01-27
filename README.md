
# x-clone-object

## Requirements

Node v5.0.0 or later with `--es-staging` flag

## Features

 * Clone JavaScript objects
  - Objects with prototype `Object.prototype`
  - Objects with prototype `null`

 * Clone JavaScript arrays
  - Instances of `Array` or its subclasses
  - Instances of JavaScript typed arrays or their subclasses

 * Clone ECMAScript 6 containers
  - Instances of `Set` or its subclasses
  - Instances of `Map` or its subclasses

 * Exactly one copy for one clonable object per one `.create()`
  - The cloner create a clone for a clonable object only once and reused the clone if encounter another reference to the clonable object
  - You can clone **circular objects**

## Examples

```javascript
var CloneObject = require('x-clone-object').OASM;
var duplicated = [
	{type: '{Object}'},
	{type: '{null}', __proto__: null},
	new Set([
		'grandparent',
		['parent', ['children', ['grandchildren']]]
	]),
	new Map([
		[{key: 'a'}, {value: 'a'}],
		[{key: 'b'}, {value: 'b'}]
	])
];
var circular = {
	array: ['array'],
	object: {type: 'child-of-circular'},
	set: new Set(['circular']),
	map: new Map([['type', 'child-of-circular']])
};
var circular_left_array_element = ['left-element'];
var circular_right_array_element = ['right-element'];
circular.array.push(circular_left_array_element, circular_right_array_element);
circular_left_array_element.push(circular_right_array_element);
circular_right_array_element.push(circular_left_array_element);
circular.object.parent = circular;
var cset = new Set([circular]);
circular.set.add(cset);
var cmap = new Map([['parent', circular], [circular, 'is parent']]);
circular.map.set('child', cmap);
var clonable = {
	'Object.prototype': {
		'subobject': {a: 123},
		'first-appear-of-duplicated': duplicated
	},
	'Object.create(null)': {
		'subobject': {b: 456},
		'see-duplicated-again': duplicated,
		__proto__: null
	},
	'circular': circular
};
var cloner = new CloneObject();
var clone = cloner.create(clonable);
console.log(clone);
```
