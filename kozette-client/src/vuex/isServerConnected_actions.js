'use strict';

export const serverConnectionChange = function ( { dispatch }, value ) {
    // persist in state the server connection status
    dispatch( 'SERVER_CONNECTION_CHANGE', value );
};