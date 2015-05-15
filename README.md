pdist
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes pairwise distances between sequences


## Installation

``` bash
$ npm install compute-pdist
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var pdist = require( 'compute-pdist' );
```

#### pdist( X[, options] )

This function by default computes distances between pairs of elements of input array `X`. It returns an array holding the pairwise distances between the elements of `X`.

The function accepts the following `options`:

*	__distance__: distance to calculate, either
		[euclidean](https://github.com/compute-io/euclidean-distance) (default),
		[cosine](https://github.com/compute-io/cosine-distance),
		[chebyshev](https://github.com/compute-io/chebyshev-distance),
		[manhattan](https://github.com/compute-io/manhattan-distance),
		[minkowski](https://github.com/compute-io/minkowski-distance)
*	__accessor__: accessor function for accessing `array` values.
*	__p__: norm order (`p > 0`) if `minkowski distance` is used.

The returned array which holds all the pairwise distances is of length `m(m–1)/2`, where `m` is the number of elements in `X`. It holds the elements of the lower left triangle of the m-by-m distance matrix in column order. The returned array comes with two helper methods:

#### .get( i, j )
This method returns the distance between the `i`th and `j`th element of the orignal input `X`.

#### .toMatrix()
This method creates the full m x m distance matrix which holds the pairwise distances and zeros on the main diagonal.

For object `arrays`, provide an accessor `function` for accessing `numeric` values.

``` javascript
var X = [
		[1,2],
		[2,4],
		[3,5]
	],
	[
		[1,1],
		[2,2],
		[3,7]
	]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var dist = pdist( X, {
	'accessor': getValue
});
// returns 3
```

The accessor `function` is provided two arguments:

-	__d__: current datum.
-	__i__: current datum index.

## Examples

``` javascript
var pdist = require( 'compute-pdist' );

var X = [
	[ 2, 4, 3, 1],
	[ 1, 2, 2, 1],
	[ 7, 3, 9, 7],
	[ 11, 9, 9, 8],
	[ 3, 2, 3, 1]
];

var d = pdist( X );
// returns [ 2.449, 9.899, .. ]

// distance between element 0 and 2:
d.get( 0, 2 );
// returns 9.899

// distance matrix:
var dMat = d.toMatrix();
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The Compute.io Authors.


[npm-image]: http://img.shields.io/npm/v/compute-pdist.svg
[npm-url]: https://npmjs.org/package/compute-pdist

[travis-image]: http://img.shields.io/travis/compute-io/pdist/master.svg
[travis-url]: https://travis-ci.org/compute-io/pdist

[coveralls-image]: https://img.shields.io/coveralls/compute-io/pdist/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/pdist?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/pdist.svg
[dependencies-url]: https://david-dm.org/compute-io/pdist

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/pdist.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/pdist

[github-issues-image]: http://img.shields.io/github/issues/compute-io/pdist.svg
[github-issues-url]: https://github.com/compute-io/pdist/issues
