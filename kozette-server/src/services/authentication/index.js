'use strict';

const authentication = require( 'feathers-authentication' );
const hooks = require( './hooks' );

module.exports = function () {
    const app = this;

    // base conf for auth
    let config = app.get( 'auth' );
    app.configure( authentication( config ) );

    const tokenService = app.service( '/auth/token' );
    
    // setup before and after hooks
    tokenService.before( hooks.before );
    
    tokenService.after( hooks.after );
    
};
