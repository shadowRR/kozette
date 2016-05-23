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

    // setup filters
    userService.filter( ( data, connection ) => {
        if ( !connection.user ) {
            return false;
        }
        return data;
    } );

    // fixtures
    // userModel.update( {}, { 'status.socketIds': [] }, { multi: true } )
    //     .then( () => console.log( 'reset of socket ids is finished' ) )
    //     .catch( err => console.error( err ) );
};
