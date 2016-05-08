'use strict';

const path = require( 'path' );
const service = require( 'feathers-mongoose' );
const messageModel = require( '../../models/messages.models.js' );
const hooks = require( './hooks' );

module.exports = function () {
    const app = this;

    // service options with the mongoose
    // model for messages
    let options = {
        Model: messageModel,
        paginate: {
            default: 200,
            max: 200
        }
    };

    // Initialize our service with any options it requires
    app.use( '/messages', service( options ) );

    // Get our initialize service to that we can bind hooks
    const messageService = app.service( '/messages' );

    // Set up our before hooks
    messageService.before( hooks.before );

    // Set up our after hooks
    messageService.after( hooks.after );
};
