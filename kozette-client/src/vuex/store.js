'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

import messages from './modules/messages';
import server from './modules/server';
import users from './modules/users';
import window from './modules/window';

const debug = process.env.NODE_ENV !== 'production'

// make Vue aware of Vuex
Vue.use( Vuex );

export default new Vuex.Store( { 
    modules: { messages, server, users, window },
    strict: debug
} );
