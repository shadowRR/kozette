'use strict';

import { WINDOW_FOCUS } from '../mutation-types';

const state = {
	windowFocused: true
};

const mutations = {

	[ WINDOW_FOCUS ]( state, value ) {
        state.windowFocused = value;
    }
	
};

export default { state, mutations };