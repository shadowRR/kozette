'use strict';

const path = require( 'path' );
const service = require( 'feathers-mongoose' );
const messageModel = require( './message-model.js' );
const hooks = require( './hooks' );

module.exports = function () {
    const app = this;
    
    let options = {
        Model: messageModel,
        paginate: {
            default: 50,
            max: 200
        }
    };

    // init
    app.use( '/messages', service( options ) );
    const messageService = app.service( '/messages' );

    // hooks
    messageService.before( hooks.before );
    messageService.after( hooks.after );

    // filters
    messageService.filter( ( data, connection ) => !connection.user ? false : data );
};
