/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdist = require( './../lib' );

var manhattan = require('compute-manhattan-distance' ),
	euclidean = require( 'compute-euclidean-distance' ),
	chebyshev = require( 'compute-chebyshev-distance' ),
	minkowski = require( 'compute-minkowski-distance' ),
	cosine = require( 'compute-cosine-distance');


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-pdist', function tests() {

	it( 'should export a function', function test() {
		expect( pdist ).to.be.a( 'function' );
	});


	it( 'should throw an error if not provided an array of arrays as the first input argument', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{},
			[]
		];
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				pdist( value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				pdist( [ [ 1, 2, 3], [ 4, 5, 6 ] ], value );
			};
		}
	});

	it( 'should throw an error if provided a `distance` option which is a non-string', function test() {
		var values = [
			5,
			null,
			undefined,
			NaN,
			true,
			{},
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				pdist( [ [ 1, 2, 3], [ 4, 5, 6 ] ], {'distance': value} );
			};
		}
	});

	it( 'should throw an error if provided a `p` option which is not a positive number primitive', function test() {
		var values = [
			'5',
			-5,
			0,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				pdist( [ [2,3,4], [3,4,5] ], {
					'p': value
				});
			};
		}
	});

	it( 'should compute the pairwise distances', function test() {

		var i, j, d, X;

		X = [
			[ 2, 4, 3, 1],
			[ 1, 2, 2, 1],
			[ 7, 3, 9, 7],
			[ 11, 9, 9, 8],
			[ 3, 2, 3, 1]
		];

		// default: euclidean distance
		d = pdist( X, {'distance':'euclidean'} );
		for ( i = 0; i < X.length; i++ ) {
			for ( j = i + 1; j < X.length; j++ ) {
				expect( d.get( i, j ) === euclidean(X[i], X[j]) ).to.be.true;
			}
		}

		d = pdist( X );
		for ( i = 0; i < X.length; i++ ) {
			for ( j = i + 1; j < X.length; j++ ) {
				expect( d.get( i, j ) === euclidean(X[i], X[j]) ).to.be.true;
			}
		}

		// chebyshev distance
		d = pdist( X, {
			'distance':'chebyshev'
		});
		for ( i = 0; i < X.length; i++ ) {
			for ( j = i + 1; j < X.length; j++ ) {
				expect( d.get( i, j ) === chebyshev(X[i], X[j]) ).to.be.true;
			}
		}

		// cosine distance
		d = pdist( X, {
			'distance':'cosine'
		});
		for ( i = 0; i < X.length; i++ ) {
			for ( j = i + 1; j < X.length; j++ ) {
				expect( d.get( i, j ) === cosine(X[i], X[j]) ).to.be.true;
			}
		}

		// manhattan distance
		d = pdist( X, {
			'distance':'manhattan'
		});
		for ( i = 0; i < X.length; i++ ) {
			for ( j = i + 1; j < X.length; j++ ) {
				expect( d.get( i, j ) === manhattan(X[i], X[j]) ).to.be.true;
			}
		}

		// minkowski distance
		d = pdist( X, {
			'distance':'minkowski',
			'p': 3
		});
		for ( i = 0; i < X.length; i++ ) {
			for ( j = i + 1; j < X.length; j++ ) {
				expect( d.get( i, j ) === minkowski(X[i], X[j], {'p': 3} ) ).to.be.true;
			}
		}

	});

	it( 'can export the matrix of pairwise distances', function test() {
		var i, j, d, X;

		X = [
			[ 2, 4, 3, 1],
			[ 1, 2, 2, 1],
			[ 7, 3, 9, 7],
			[ 11, 9, 9, 8],
			[ 3, 2, 3, 1]
		];

		// default: euclidean distance
		d = pdist( X, {} );
		var dMat = d.toMatrix();
		for ( i = 0; i < X.length; i++ ) {
			for ( j = 0; j < X.length; j++ ) {
				if ( i !== j ) {
					expect( dMat[i][j] === euclidean(X[i], X[j]) ).to.be.true;
				} else {
					expect( dMat[i][j] === 0 ).to.be.true;
				}

			}
		}

	});

});
