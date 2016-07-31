'use strict';

const chai = require( 'chai' );
const expect = chai.expect;
const chaiHttp = require( 'chai-http' );
const app = require( '../src/app' );

chai.use( chaiHttp );

describe( 'feathers server', function() {

    it( 'should send back a 404 page on not found request', done => {
        chai.request( app )
            .get( '/path/to/nowhere' )
            .end( function( err, res ) {
                expect( res ).to.have.status( 404 );
                expect( res ).to.be.json;
                done();
            } );
    } );

} );
