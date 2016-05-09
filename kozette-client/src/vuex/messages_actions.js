'use strict';

import _ from 'lodash';
import {messageService} from '../services';

export const fetchMessages = function ( { dispatch } ) {
    // get the messages list from feathers websockets
    messageService.find( { query: { $sort: { created_at: 1 } } } )
        .then( messages => {
            dispatch( 'FETCH_MESSAGES', messages.data );
        } );
};

export const addMessage = function ( { dispatch, state } ) {
    // new message created on the server, dispatch it
    messageService.on( 'created', message => {
        // play sound if message is from another user
        if ( (state.currentUser.data._id != message.user_id) && !state.currentUser.data.status.muted )
            $( '#audio-kozette-message' )[ 0 ].play();

        // show notifications if available and permitted
        if ( (state.currentUser.data._id != message.user_id) &&
            window.Notification && Notification.permission !== 'denied' ) {
            // request perm, and if accepted, show
            Notification.requestPermission( () => {
                // get the user for this message
                const user = _.find( state.users, { _id: message.user_id } );
                new Notification(
                    `New message from ${user.nickname || user.email}`, {
                        body: message.text,
                        icon: '/static/logo/mobile/logo_256.png'
                    } );
            } );
        }

        dispatch( 'ADD_MESSAGE', message );
    } );
};
