'use strict';

import _ from 'lodash';

import { FETCH_MESSAGES, ADD_MESSAGE, FETCH_PINNED_MESSAGES, 
	ADD_PINNED_MESSAGE, REMOVE_PINNED_MESSAGE } from '../mutation-types';

const state = {
	messages: [],
	pinned_messages: []
};

const mutations = {

	[ FETCH_MESSAGES ]( state, messages ) {
        state.messages = messages;
    },

    [ ADD_MESSAGE ]( state, message ) {
        state.messages.push( message );
    },

    [ FETCH_PINNED_MESSAGES ]( state, pinned_messages ) {
        state.pinned_messages = pinned_messages;
    },

    [ ADD_PINNED_MESSAGE ]( state, pinned_message ) {
        state.pinned_messages.push( pinned_message );
    },

    [ REMOVE_PINNED_MESSAGE ]( state, pinned_message ){
        let index = _.findIndex( state.pinned_messages, { _id: pinned_message._id } );
        if ( index != -1 )
            state.pinned_messages.$remove( state.pinned_messages[ index ] );
    }
	
};

export default { state, mutations };