'use strict';

const authentication = require( './authentication' );
const mongoose = require( 'mongoose' );
const message = require( './message' );
const user = require( './user' );

module.exports = function () {
    const app = this;

    // make sure mongoose use ES6 promise
    mongoose.Promise = global.Promise;
    // connect to the mongodb database
    mongoose.connect( app.get( 'mongodb' ) );

    app.configure( authentication );
    app.configure( user );
    app.configure( message );
};
