<template>

    <base v-if="currentUser"></base>
    <login v-else></login>

</template>

<script type="text/babel">

    import Login from './components/Login/Login.vue';
    import Base from './components/Chat/Base.vue';
    import {feathers_socket} from './services';
    import {currentUser} from './vuex/currentUser_getters';
    import {loginCurrentUser} from './vuex/currentUser_actions';
    import {userStatusInterval} from 'plugins/users_status';

    export default {
        components: { Login, Base },
        vuex: {
            getters: {
                currentUser
            },
            actions: {
                loginCurrentUser
            }
        },
        created() {
            // check when created that we are logged in
            feathers_socket.authenticate()
                    .then( ( result ) => {
                        this.loginCurrentUser( result );
                        // watching change in currentUser, so we can
                        // detect when the currentUser disconnected
                        // and stop the online status updates
                        let interval = userStatusInterval( this.currentUser.data._id );
                        this.$watch( 'currentUser', () => {
                            if ( !this.currentUser )
                                clearInterval( interval );
                        } );
                    } )
                    .catch( error => {
                        if ( !error.code === 401 ) console.error( error );
                    } );
        }
    }
</script>

<style>

</style>
