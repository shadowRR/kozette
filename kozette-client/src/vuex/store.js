'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

// make Vue aware of Vuex
Vue.use( Vuex );

const state = {
    isServerConnected: true,
    windowFocused: true,
    currentUser: false,
    users: [],
    messages: [],
    pinned_messages: []
};

const mutations = {

    SERVER_CONNECTION_CHANGE( state, value ) {
        state.isServerConnected = value;
    },

    WINDOW_FOCUS( state, value ) {
        state.windowFocused = value;
    },

    LOGIN_USER( state, user ) {
        state.currentUser = user.data._id;
    },

    LOGOUT_USER( state ) {
        state.currentUser = false;
    },

    FETCH_MESSAGES( state, messages ) {
        state.messages = messages;
    },

    ADD_MESSAGE( state, message ) {
        state.messages.push( message );
    },

    FETCH_USERS( state, users ) {
        state.users = users;
    },

    ADD_USER( state, user ) {
        state.users.push( user );
    },

    UPDATE_PATCH_USER( state, user ) {
        let index = _.findIndex( state.users, { _id: user._id } );
        state.users.$set( index, user );
    },

    FETCH_PINNED_MESSAGES( state, pinned_messages ) {
        state.pinned_messages = pinned_messages;
    },

    ADD_PINNED_MESSAGE( state, pinned_message ) {
        state.pinned_messages.push( pinned_message );
    },

    REMOVE_PINNED_MESSAGE( state, pinned_message ){
        let index = _.findIndex( state.pinned_messages, { _id: pinned_message._id } );
        // if we have found the pinned message, remove it
        // we have to make sure of that because we have no
        // way of knowing if a patched message who has is pinned
        // field to false wasn't already in that state previously
        if ( index != -1 )
            state.pinned_messages.$remove( state.pinned_messages[ index ] );
    }

};

export default new Vuex.Store( { state, mutations } );
