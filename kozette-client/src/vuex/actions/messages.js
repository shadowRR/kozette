'use strict';

import _ from 'lodash';
import { messageService } from '../../services';
import * as types from '../mutation-types';

export const fetchMessages = function ( { dispatch } ) {
    messageService.find( { query: { $sort: { created_at: -1 }, $limit: 200 } } )
        .then( messages => dispatch( types.FETCH_MESSAGES, messages.data ) );
};

export const fetchMoreMessages = function ( { dispatch, state } ) {
    const messageCount = state.messages.messages.length;
    messageService.find( { query: { $sort: { created_at: -1 }, $skip: messageCount, $limit: 25 } } )
        .then( messages => messages.data.forEach( message => dispatch( types.ADD_MESSAGE, message ) ) );
};

export const addMessage = function ( { dispatch, state } ) {

    messageService.on( 'created', message => {

        // so first, get the current user data
        const loggedUser = _.find( state.users.users, user => user._id == state.users.currentUser );

        // play sound if message is from another user
        if ( ( state.users.currentUser != message.user_id ) && !loggedUser.status.muted && !state.window.windowFocused )
            $( '#audio-kozette-message' )[ 0 ].play();

        // show notifications if available and permitted
        if ( ( state.users.currentUser != message.user_id ) && loggedUser.status.notifications && !state.window.windowFocused &&
            window.Notification && Notification.permission !== 'denied' ) {

            // request perm, and if accepted, show
            Notification.requestPermission( () => {
                // get the user infos for this message
                const user = _.find( state.users.users, { _id: message.user_id } );

                const n = new Notification(
                    `New message from ${user.nickname || user.email}`, {
                        body: message.text,
                        icon: '/static/img/logo/mobile/logo_256.png'
                    } );

                // close the notifications auto...
                setTimeout( () => n.close(), 1000 * 5 );

            } );

        }

        dispatch( types.ADD_MESSAGE, message );
    } );
};

export const fetchPinnedMessages = function ( { dispatch } ) {
    messageService.find( { query: { pinned: true, $sort: { created_at: 1 } } } )
        .then( pinned_messages => dispatch( types.FETCH_PINNED_MESSAGES, pinned_messages.data ) );
};

export const addPinnedMessages = function ( { dispatch } ) {
    messageService.on( 'created', message => {
        if ( message.pinned ) dispatch( types.ADD_PINNED_MESSAGE, message );
    } );
};

export const removePinnedMessages = function ( { dispatch } ) {
    // if patched message has pinned -> false then
    // dispatch, in case it was previously true
    messageService.on( 'patched', message => {
        if ( !message.pinned ) dispatch( types.REMOVE_PINNED_MESSAGE, message );
    } );
};
