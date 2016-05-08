import Vue from 'vue';
import App from './App.vue';

import store from './vuex/store.js';

/* eslint-disable no-new */
new Vue( {
    el: 'body',
    components: { App },
    store
} );
