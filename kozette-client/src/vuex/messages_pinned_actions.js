import {messageService} from '../services';

export const fetchPinnedMessages = function ( { dispatch } ) {
    // get the pinned messages list
    messageService.find( { query: { pinned: true, $sort: { created_at: 1 } } } )
        .then( pinned_messages => {
            dispatch( 'FETCH_PINNED_MESSAGES', pinned_messages.data );
        } );
};

export const addPinnedMessages = function ( { dispatch } ) {
    // new message, if pinned, dispatch and add
    messageService.on( 'created', message => {
        if ( message.pinned )
            dispatch( 'ADD_PINNED_MESSAGE', message );
    } );
};

export const removePinnedMessages = function ( { dispatch } ) {
    // if patched message has pinned -> false then
    // dispatch, in case it was previously true
    messageService.on( 'patched', message => {
        if ( !message.pinned )
            dispatch( 'REMOVE_PINNED_MESSAGE', message );
    } );
};