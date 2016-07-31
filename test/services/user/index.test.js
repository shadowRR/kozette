'use strict';

const expect = require( 'chai' ).expect;
const app = require( '../../../src/app' );
const errors = require( 'feathers-errors' );
const mongoose = require( 'mongoose' );

describe( 'user service', () => {

	const userService = app.service( '/users' );

	describe( 'service', () => {

		it( 'registered the users service', () => {
		    expect( userService ).to.be.ok;
		} );

	} );

	beforeEach( done => {
	    userService.Model.remove().then( () => done() ).catch( done );
	} );

	describe( 'create', () => {

	    it( 'can create a single user and return it', done => {
	    	const original_data = { email: 'plop@plop.com', password: 'plop' };

	    	userService.create( original_data )
	    		.then( data => {
	    			expect( data ).to.be.instanceOf( Object );
	    			expect( data ).to.not.be.empty;
	    			expect( data.email ).to.equal( 'plop@plop.com' );
	    			expect( data.color ).to.equal( 'white' );
	   				expect( data.roles[ 0 ] ).to.equal( 'admin' );
	   				done();
	    		} )
	    		.catch( done );

	    } );

	    it( 'can create multiple new users and return them', done => {
	   		const users = [
	   			{ email: 'plop@plop.com', password: 'plop' },
	   			{ email: 'demo', password: 'demo' }
	   		];

	    	userService.create( users )
	    		.then( data => {
	   				expect( data ).to.be.instanceOf( Array );
	   				expect( data ).to.not.be.empty;
	   				expect( data[ 0 ].email ).to.equal( 'plop@plop.com' );
	   				expect( data[ 1 ].email ).to.equal( 'demo' );
    				expect( data[ 0 ].password ).to.not.equal( 'plop' );
	    			expect( data[ 1 ].password ).to.not.equal( 'demo' );
	    			done();
	    		} )
	   			.catch( done );
	   	} );

	} );

	describe( 'update', () => {

	    it( 'cannot use update', done => {
	    	userService.update('568225fbfe21222432e836ff', { email: 'demo@demo.com', password: 'plop' } )
	    		.catch( error => {
	    			expect( error ).to.be.ok;
	    			expect( error instanceof errors.MethodNotAllowed ).to.be.ok;
	    			expect( error.message ).to.equal( 'Calling \'update\' not allowed.' );
	    			done();
	    		} );
	    } );

	} );

	describe( 'patch', () => {

	    it( 'can patch a single user', done => {
	    	const user = { email: 'plop@plop.com', password: 'plop' };
	    	userService.create( user )
	    		.then( user_data => {
		    		userService.patch( user_data._id, { email: 'demo@demo.com' } )
		    			.then( data => {
		    				expect( data ).to.be.instanceOf( Object );
		    				expect( data ).to.not.be.empty;
		    				expect( data.email ).to.equal( 'demo@demo.com' );
		    				done();
		    			} )
		    			.catch( done );
	    	} ).catch( done );
	    } );

	    it( 'cannot patch for a non-existing id', done => {
	    	userService.patch( '568225fbfe21222432e836ff', { email: 'demo@demo.com' } )
	    		.catch( error => {
	    			expect( error ).to.be.ok;
	    			expect( error instanceof errors.NotFound ).to.be.ok;
	    			expect( error.message ).to.equal( 'No record found for id \'568225fbfe21222432e836ff\'' );
	    			done();
	    		} );
	    } );

	} );

	describe( 'remove', () => {

	    it( 'cannot remove a user', done => {
	    	const user = { email: 'plop@plop.com', password: 'plop' };
	    	userService.create( user )
	    		.then( user_data => {
		    		userService.remove( user_data._id )
		    			.catch( error => {
		    				expect( error ).to.be.ok;
		    				expect( error instanceof errors.MethodNotAllowed ).to.be.ok;
		    				expect( error.message ).to.equal( 'Calling \'remove\' not allowed.' );
		    				done();
		    			} );
		    		} )
	    		.catch( done );
	    } );

	} );

} );
