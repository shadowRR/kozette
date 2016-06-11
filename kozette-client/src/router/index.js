'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
// components
import Base from '../components/Base.vue';
import Login from '../components/Login/Login.vue';
import App from '../components/App.vue';
import Chat from '../components/Chat/Chat.vue';
// server
import { feathers_socket } from '../services';

Vue.use( VueRouter );
const router = new VueRouter();

router.map( {
    '/': {
        name: 'app',
        component: App,
        auth: true,
        subRoutes: {
            '/': { component: Chat }
        }
    },
    '/login': {
        name: 'login',
        component: Login
    }
} );

router.beforeEach( function ( { to, next, redirect } ) {

    if ( to.auth ) {
        // if route has to be accessed when logged in
        feathers_socket.authenticate()
            .then( () => next() )
            .catch( () => redirect( '/login' ) );
    }
    else {
        // if every check is fine, then go to the requested route
        next();
    }

} );

router.start( Base, '#app' );