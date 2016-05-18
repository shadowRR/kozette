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
    // plugins
    import {userStatusInterval} from '../../plugins/users_status';
    // vuex
    import {loginCurrentUser} from '../../vuex/currentUser_actions';

    export default {
        data() {
            return {
                isServerConnected: feathers_socket.io.connected,
                interval: false
            }
        },
        vuex: {
            getters: { currentUser },
            actions: { logoutCurrentUser, loginCurrentUser }
        },
        ready() {
            // attempt auth is there's no current user
            // redirect to login if it fails
            if ( !this.currentUser ) {
                feathers_socket.authenticate()
                        .then( user => {
                            this.loginCurrentUser( user );
                            // online status
                            this.interval = userStatusInterval( this.currentUser );
                        } )
                        .catch( err => {
                            console.error( err );
                            this.$router.go( { name: 'login' } );
                        } );
            }
            else {
                // online status
                this.interval = userStatusInterval( this.currentUser );
            }

            // socket io connect / disconnect behavior
            feathers_socket.io
                    .on( 'reconnect', () => this.isServerConnected = true )
                    .on( 'disconnect', () => this.isServerConnected = false );
        },
        methods: {
            /**
             * @summary logout the user
             */
            logout()
            {
                feathers_socket.logout();
                clearInterval( this.interval );
                this.logoutCurrentUser();
            }
        }
    };

</script>