<template>

    <!-- audio -->
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

    <!-- chat -->
    <main id="content" class="split split-horizontal">
        <router-view></router-view>
    </main>

    <!-- sidebar -->
    <aside id="sidebar" class="split split-horizontal">

        <!-- nav -->
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
    import { currentUser } from '../vuex/getters/users';
    import { loginCurrentUser } from '../vuex/actions/users';
    import { serverConnectionChange } from '../vuex/actions/server';
    import { windowFocusChange } from '../vuex/actions/window';
    import { fetchMessages } from '../vuex/actions/messages';

    export default {

        components: { Controls, UsersList, PinnedMessagesList },

        vuex: {

            getters: { currentUser },

            actions: { loginCurrentUser, serverConnectionChange, windowFocusChange, fetchMessages }

        },

        created() {
            // if not connected, authenticate back the user if possible
            // (mainly triggered when user is reloading the page)
            if ( !this.currentUser )
                this.authenticate( true );

            // catch events on disconnect and reconnect for the 
            // websockets connection, so we can show the actual 
            // socket status and re-authenticate the user if needed
            feathers_socket.io
                .on( 'reconnect', () => this.authenticate( true ) )
                .on( 'disconnect', () => this.authenticate( false ) );
        },

        ready() {
            this.splitView();
            this.windowFocus();
        },

        methods: {

            /**
             * @summary re-authenticate the user when needed
             */
            authenticate() {
                this.serverConnectionChange( server );
                feathers_socket.authenticate()
                    .then( user => {
                        this.loginCurrentUser( user );
                        this.fetchMessages();
                    } )
                    .catch( () => this.$router.go( { name: 'login' } ) );
            },

            /**
             * @summary activate split plugin
             */
            splitView() {
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
            },

            /**
             * @summary make sure the app knows when the user is focus 
             * on the page, so we don't show notifications or play sound
             * when he/she is already looking at the app
             */
            windowFocus() {
                $( window ).on( 'focus blur mousemove', e => this.windowFocusChange( e.type != 'blur' ) );
            }

        }
        
    }

</script>