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
    import {feathers_socket} from '../services';
    // vuex
    import {currentUser} from '../vuex/currentUser_getters';
    import {loginCurrentUser} from '../vuex/currentUser_actions';

    export default {
        components: { Controls, UsersList, PinnedMessagesList },
        vuex: {
            getters: { currentUser },
            actions: { loginCurrentUser }
        },
        ready() {

            // attempt reconnect if not connected
            if ( !this.currentUser ) {
                feathers_socket.authenticate()
                        .then( user => this.loginCurrentUser( user ) )
                        .catch( () => this.$router.go( { name: 'login' } ) );
            }

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
        }
    }

</script>