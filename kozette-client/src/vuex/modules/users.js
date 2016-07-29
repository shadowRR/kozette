'use strict';

import _ from 'lodash';

import { LOGIN_USER, LOGOUT_USER, FETCH_USERS, ADD_USER, UPDATE_PATCH_USER } from '../mutation-types';

const state = {
    currentUser: false,
	users: []
};

const mutations = {

    [ LOGIN_USER ]( state, user ) {
        state.currentUser = user.data._id;
    },

    [ LOGOUT_USER ]( state ) {
        state.currentUser = false;
    },

	[ FETCH_USERS ]( state, users ) {
        state.users = users;
    },

    [ ADD_USER ]( state, user ) {
        state.users.push( user );
    },

    [ UPDATE_PATCH_USER ]( state, user ) {
        let index = _.findIndex( state.users, { _id: user._id } );
        state.users.$set( index, user );
    }
	
};

export default { state, mutations };