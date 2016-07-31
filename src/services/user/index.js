'use strict';

const path = require( 'path' );
const service = require( 'feathers-mongoose' );
const userModel = require( './user-model.js' );
const hooks = require( './hooks' );

module.exports = function () {
    const app = this;

    // service options with the mongoose
    // model for users
    let options = { 
        Model: userModel,
        paginate: {
            default: 25,
            max: 100
        }
    };

    // init
    app.use( '/users', service( options ) );
    const userService = app.service( '/users' );

    // hooks
    userService.before( hooks.before );
    userService.after( hooks.after );

    // filters
    userService.filter( ( data, connection ) => !connection.user ? false : data );
};
