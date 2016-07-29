'use strict';

import * as types from '../mutation-types';

export const windowFocusChange = function ( { dispatch }, value ) {
    // persist in state the window focus status
    dispatch( types.WINDOW_FOCUS, value );
};