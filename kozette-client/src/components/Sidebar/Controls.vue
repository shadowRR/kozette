<template>

    <img id="logo" v-bind:src="logoIsMuted" alt="logo kozette">

    <span class="oneliner">// Server -----------------------------------------------------------</span>
    Server :
    <span v-if="isServerConnected" class="green-text">connected</span>
    <span v-else class="red-text">offline</span>

    <span class="oneliner">// Account -----------------------------------------------------------</span>
    <a class="red-link" v-on:click="logout">[ Logout ]</a>

</template>

<script type="text/babel">

    // lib
    import _ from 'lodash';
    // feathers
    import {feathers_socket, userService} from '../../services';
    // vuex
    import {currentUser} from '../../vuex/currentUser_getters';
    import {loginCurrentUser, logoutCurrentUser} from '../../vuex/currentUser_actions';
    import {getUsersList} from '../../vuex/users_getters';

    export default {
        data() {
            return {
                isServerConnected: true
            }
        },
        vuex: {
            getters: { currentUser, getUsersList },
            actions: { logoutCurrentUser, loginCurrentUser }
        },
        ready() {
            feathers_socket.io
                    .on( 'reconnect', () => this.isServerConnected = true )
                    .on( 'disconnect', () => this.isServerConnected = false );
        },
        computed: {
            /**
             * @summary return proper logo based on muted value
             */
            logoIsMuted() {
                const user = _.find( this.getUsersList, user => user._id == this.currentUser );
                return user && user.status.muted ?
                        '/static/img/logo/kozette_large_nosound.png' :
                        '/static/img/logo/kozette_large_transparent.png';
            }
        },
        methods: {
            /**
             * @summary logout the user
             */
            logout()
            {
                feathers_socket.logout();
                this.logoutCurrentUser();
                this.$router.go( { name: 'login' } );
            }
        }
    };

</script>