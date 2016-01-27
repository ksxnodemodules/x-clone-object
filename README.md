
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
