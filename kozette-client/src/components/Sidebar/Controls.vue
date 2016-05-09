<template>

    <img id="logo" src="/static/img/logo/kozette_large_transparent.png" alt="logo kozette">

    <span class="oneliner">// Server -----------------------------------------------------------</span>
    Server :
    <span v-if="isServerConnected" class="green-text">connected</span>
    <span v-else class="red-text">offline</span>

    <span class="oneliner">// Account -----------------------------------------------------------</span>
    <a class="red-link" v-on:click="logout">[ Logout ]</a>

</template>

<script type="text/babel">

    // feathers
    import {feathers_socket} from '../../services';
    // currentUser
    import {currentUser} from '../../vuex/currentUser_getters';
    import {logoutCurrentUser} from '../../vuex/currentUser_actions';

    export default {
        data() {
            return {
                isServerConnected: feathers_socket.io.connected
            }
        },
        vuex: {
            getters: {
                currentUser
            },
            actions: {
                logoutCurrentUser
            }
        },
        ready() {

            // socket io connect / disconnect behavior
            feathers_socket.io
                    .on( 'reconnect', () => {
                        this.isServerConnected = true;
                    } )
                    .on( 'disconnect', () => {
                        this.isServerConnected = false;
                    } );
        },
        methods: {
            /**
             * @summary logout the user
             * @return
             */
            logout() {
                // TODO the user won't be seen as logged out before
                // at least a minute in case he is still available
                // on another terminal
                feathers_socket.logout();
                this.logoutCurrentUser();
            }
        }
    };

</script>