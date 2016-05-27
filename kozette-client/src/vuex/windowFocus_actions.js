'use strict';

export const windowFocusChange = function ( { dispatch }, value ) {
    // persist in state the window focus status
    dispatch( 'WINDOW_FOCUS', value );
};