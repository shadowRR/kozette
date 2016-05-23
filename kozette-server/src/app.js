'use strict';

const path = require( 'path' );
const serveStatic = require( 'feathers' ).static;
const favicon = require( 'serve-favicon' );
const compress = require( 'compression' );
const cors = require( 'cors' );
const feathers = require( 'feathers' );
const configuration = require( 'feathers-configuration' );
const hooks = require( 'feathers-hooks' );
const socketio = require( 'feathers-socketio' );
const middleware = require( './middleware' );
const services = require( './services' );
const plugins = require( './plugins' );

const app = feathers();

app.configure( configuration( path.join( __dirname, '..' ) ) );

if ( process.env.NODE_ENV === 'production' ) {
    app
        .use( compress() )
        .options( '*', cors() )
        .use( cors() )
        .use( favicon( path.join( app.get( 'public' ), '/static/img/logo/mobile/logo_128.png' ) ) )
        .use( '/', serveStatic( app.get( 'public' ) ) )
        .configure( hooks() )
        .configure( socketio() )
        .configure( services )
        .configure( middleware )
        .configure( plugins );
}
else {
    app
        .use( compress() )
        .options( '*', cors() )
        .use( cors() )
        .configure( hooks() )
        .configure( socketio() )
        .configure( services )
        .configure( middleware )
        .configure( plugins );
}

module.exports = app;
