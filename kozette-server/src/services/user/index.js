'use strict';

const path = require( 'path' );
const service = require( 'feathers-mongoose' );
const userModel = require( '../../models/users.models.js' );
const hooks = require( './hooks' );

module.exports = function () {
    const app = this;

    // service options with the mongoose
    // model for users
    let options = {
        Model: userModel,
        paginate: {
            default: 5,
            max: 25
        }
    };

    // Initialize our service with any options it requires
    app.use( '/users', service( options ) );

    // Get our initialize service to that we can bind hooks
    const userService = app.service( '/users' );

    // Set up our before hooks
    userService.before( hooks.before );

    // Set up our after hooks
    userService.after( hooks.after );
};