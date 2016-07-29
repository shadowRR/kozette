'use strict';

import * as types from '../mutation-types';

export const serverConnectionChange = function ( { dispatch }, value ) {
    // persist in state the server connection status
    dispatch( types.SERVER_CONNECTION_CHANGE, value );
};