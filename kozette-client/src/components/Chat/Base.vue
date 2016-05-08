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
        <!-- chat -->
        <section id="message-list" class="split">
            <message-list></message-list>
        </section>
        <!-- input message -->
        <section id="input-message" class="split">
            <input-message></input-message>
        </section>
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

<script>

    // lib
    import Split from 'split.js';
    // components
    import MessageList from './MessageList.vue';
    import InputMessage from './InputMessage.vue';
    import Controls from './../Sidebar/Controls.vue';
    import UsersList from './../Sidebar/UsersList.vue';
    import PinnedMessagesList from './../Sidebar/PinnedMessagesList.vue';

    export default {
        components: { Controls, MessageList, InputMessage, UsersList, PinnedMessagesList },
        ready() {
            Split( [ '#content', '#sidebar' ], {
                sizes: [ 85, 15 ],
                minSize: [ 400, 200 ],
                gutterSize: 8,
                cursor: 'col-resize'
            } );

            Split( [ '#message-list', '#input-message' ], {
                direction: 'vertical',
                sizes: [ 92, 8 ],
                minSize: [ 400, 50 ],
                gutterSize: 8,
                cursor: 'row-resize'
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