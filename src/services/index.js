'use strict';

const authentication = require( './authentication' );
const mongoose = require( 'mongoose' );
const message = require( './message' );
const user = require( './user' );

module.exports = function () {
    const app = this;

    mongoose.Promise = global.Promise;
    mongoose.connect( app.get( 'mongodb' )[ app.get( 'env' ) ] );

    app.configure( authentication );
    app.configure( user );
    app.configure( message );
};
