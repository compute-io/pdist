'use strict';

var pdist = require( './../lib' );

var X = [
	[ 2, 4, 3, 1],
	[ 1, 2, 2, 1],
	[ 7, 3, 9, 7],
	[ 11, 9, 9, 8],
	[ 3, 2, 3, 1]
];

var d = pdist( X );
console.log( 'd:' );
console.log( d );

console.log( 'Distance between element 0 and 2: \n' + d.get( 0, 2 ) );
