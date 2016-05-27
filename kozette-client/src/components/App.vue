<template>

    <audio id="audio-kozette-connection" preload="auto">
        <source src="/static/sounds/kozette_connection.mp3" type="audio/mp3">
    </audio>
    <audio id="audio-kozette-disconnection" preload="auto">
        <source src="/static/sounds/kozette_disconnection.mp3" type="audio/mp3">
    </audio>
    <audio id="audio-kozette-message" preload="auto">
        <source src="/static/sounds/kozette_message.mp3" type="audio/mp3">
        <source src="/static/sounds/kozette_message.ogg" type="audio/ogg">
    </audio>

    <main id="content" class="split split-horizontal">
        <router-view></router-view>
    </main>

    <aside id="sidebar" class="split split-horizontal">
        <!-- sidebar -->
        <section id="nav" class="split">
            <controls></controls>
            <users-list></users-list>
        </section>
        <!-- pinned -->
        <section id="pinned" class="split">
            <pinned-messages-list></pinned-messages-list>
        </section>
    </aside>

</template>

<script type="text/babel">

    // components
    import Controls from './Sidebar/Controls.vue';
    import UsersList from './Sidebar/UsersList.vue';
    import PinnedMessagesList from './Sidebar/PinnedMessagesList.vue';
    // lib
    import Split from 'split.js';
    // feathers
    import { feathers_socket } from '../services';
    // vuex
    import { currentUser } from '../vuex/currentUser_getters';
    import { loginCurrentUser } from '../vuex/currentUser_actions';
    import { serverConnectionChange } from '../vuex/isServerConnected_actions';
    import { windowFocusChange } from '../vuex/windowFocus_actions';

    export default {
        components: { Controls, UsersList, PinnedMessagesList },
        vuex: {
            getters: { currentUser },
            actions: { loginCurrentUser, serverConnectionChange, windowFocusChange }
        },
        created() {
            // auth the current user
            const authenticate = () => {
                feathers_socket.authenticate()
                        .then( user => this.loginCurrentUser( user, feathers_socket.io.id ) )
                        .catch( () => this.$router.go( { name: 'login' } ) );
            };

            // if not connected, authenticate
            // (mainly triggered when user is reloading the page)
            if ( !this.currentUser )
                authenticate();

            // catch events on disconnect and reconnect for
            // the websockets connection, so we can show the
            // actual socket status and re-authenticate the user
            // if needed
            feathers_socket.io
                    .on( 'reconnect', () => {
                        this.serverConnectionChange( true );
                        authenticate();
                    } )
                    .on( 'disconnect', () => {
                        this.serverConnectionChange( false );
                    } );
        },
        ready() {

            Split( [ '#content', '#sidebar' ], {
                sizes: [ 85, 15 ],
                minSize: [ 400, 200 ],
                gutterSize: 8,
                cursor: 'col-resize'
            } );

            Split( [ '#nav', '#pinned' ], {
                direction: 'vertical',
                sizes: [ 75, 25 ],
                gutterSize: 8,
                cursor: 'row-resize'
            } );

            // to know if page is focused or not i
            // the entire application
            $( window ).on( 'focus blur mousemove', ( e ) => {
                // set the proper window focus based
                // on the actual focus state
                this.windowFocusChange( e.type != 'blur' );

            } );
        }
    }

</script>