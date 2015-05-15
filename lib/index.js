'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' ),
	isObject = require( 'validate.io-object' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isArrayArray = require( 'validate.io-array-array' );

var manhattan = require('compute-manhattan-distance' ),
	euclidean = require( 'compute-euclidean-distance' ),
	chebyshev = require( 'compute-chebyshev-distance' ),
	minkowski = require( 'compute-minkowski-distance' );

// FUNCTIONS //


/**
 * FUNCTION: partial( fn, clbk )
 *	Partially applied function from the right.
 *
 * @private
 * @param {Function} fn - input function
 * @param {Function} clbk - accessor function
 * @param {Number} p - norm order for Minkowski distance
 * @returns {Function} partially applied function
 */
function partial( fn, clbk, p ) {
	return function distance( x, y ) {
		if ( p !== undefined ) {
			return fn( x, y, {
				'accessor' : clbk,
				'p': p
			});
		} else {
			return fn( x, y, {
				'accessor' : clbk,
			});
		}
	};
} // end FUNCTION partial()

// PDIST //

/**
* FUNCTION: pdist( X[, options] )
*	Computes the pairwise distances of the elements in X
*
* @param {Array} x - input array of arrays
* @param {Object} [options] - function options
* @param {Number} [options.p=2] - norm order for Minkowski distance
* @param {Function} [options.accessor] - accessor function for accessing object array values
* @returns {Object} an array holding the pairwise distances with helper methods "get" and "toMatrix"
*/
function pdist( X, opts ) {

	var distance = euclidean, D, i, j, n, p = 2, clbk;

	if ( !isArrayArray( X ) ) {
		throw new TypeError( 'pdist()::invalid input argument. First argument must be an array of arrays. Value: `' + X + '`.' );
	}

	n = X.length;
	D = [];

	if ( arguments.length >  1 ) {

		if ( !isObject( opts ) ) {
			throw new TypeError( 'pdist()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'p' ) ) {
			p = opts.p;
			if ( !isNumber( p ) || p <= 0 ) {
				throw new TypeError( 'pdist()::invalid option. `p` option must be a positive number primitive. Option: `' + p + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'pdist()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
			}
		}

		switch (opts.distance) {
			case 'chebyshev':
				distance = clbk ? partial( chebyshev, clbk ) : chebyshev;
			break;
			case 'euclidean':
				distance =  clbk ? partial( euclidean, clbk ) : euclidean;
			break;
			case 'manhattan':
				distance = clbk ? partial( manhattan, clbk ) : manhattan;
			break;
			case 'minkowski':
				distance = clbk ? partial( minkowski, clbk, p ) : partial( minkowski, undefined, p );
			break;
		}
	}

	for ( i = 0; i < n; i++ ) {
		for ( j = i + 1; j < n; j++ ) {
			D.push( distance( X[i], X[j] ) );
		}
	}


	/**
	 * 	METHOD: get( i, j )
	 * 		retrieves the pairwise distance of element i and j, where i < j
	 * @param {Number} i - index of first element
	 * @param {Number} j - index of second element
	 * @returns {Number} distance between i and j
	 */
	Object.defineProperty( D, 'get', {
		enumerable: false,
		configurable: true,
		value: function( i, j ) {
			 var index = (i === 0) ? j - 1 : i * (n - 1) - (i * ( i - 1 ) / 2) + j - i - 1;
			 return this[ index ];
		}
	});

	/**
	 * METHOD: toMatrix().
	 * 		returns a distance matrix holding pairwise distances on off-diagonal elements,
	 *		zero otherwise
	 *
	 * @returns{Array} n x n dimensional array of arrays
	 */
	Object.defineProperty( D, 'toMatrix', {
		enumerable: false,
		configurable: true,
		value: function() {
			var ret = [];
			for ( i = 0; i < n; i++ ) {
				ret[i] = new Array( n );
				for ( j = 0; j < n; j++ ) {
					if ( i !== j) {
						ret[i][j] = i < j ? this.get( i, j ) : this.get( j, i );
					} else {
						ret[i][j] = 0;
					}
				}
			}
			return ret;
		}
	});

	return D;

} // end FUNCTION pdist()


// EXPORTS //

module.exports = pdist;
