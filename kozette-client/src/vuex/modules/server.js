'use strict';

import { SERVER_CONNECTION_CHANGE } from '../mutation-types';

const state = {
	isServerConnected: true
};

const mutations = {

    [ SERVER_CONNECTION_CHANGE ]( state, value ) {
        state.isServerConnected = value;
    }

};

export default { state, mutations };