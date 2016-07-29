<template>

    <div class="oneliner no-margin">// Pinned Messages -----------------------------------------------------------</div>
    <div id="message-list">
        <pinned-message v-for="pinnedMessage in pinnedMessages" track-by="_id" :message="pinnedMessage"></pinned-message>
    </div>

</template>

<script type="text/babel">

    // vuex
    import { getPinnedMessageList } from '../../vuex/getters/messages';
    import { fetchPinnedMessages, addPinnedMessages, removePinnedMessages } from '../../vuex/actions/messages';
    // components
    import PinnedMessage from './PinnedMessage.vue';

    export default {

        components: { PinnedMessage },

        vuex: {

            getters: { pinnedMessages: getPinnedMessageList },

            actions: { fetchPinnedMessages, addPinnedMessages, removePinnedMessages }

        },

        ready() {
            this.fetchPinnedMessages();
            this.addPinnedMessages();
            this.removePinnedMessages();
        }
        
    }

</script>