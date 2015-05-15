/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdist = require( './../lib' );


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

	});

});
