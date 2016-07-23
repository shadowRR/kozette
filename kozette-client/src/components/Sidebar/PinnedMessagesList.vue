<template>

    <div class="oneliner no-margin">// Pinned Messages -----------------------------------------------------------</div>
    <div id="message-list">
        <pinned-message v-for="pinnedMessage in pinnedMessages" track-by="_id" :message="pinnedMessage"></pinned-message>
    </div>

</template>

<script type="text/babel">

    // pinned messages
    import {getPinnedMessageList} from '../../vuex/messages_pinned_getters';
    import {fetchPinnedMessages, addPinnedMessages, removePinnedMessages} from '../../vuex/messages_pinned_actions';
    // components
    import PinnedMessage from './PinnedMessage.vue';

    export default {

        components: { PinnedMessage },

        vuex: {

            getters: {
                pinnedMessages: getPinnedMessageList
            },

            actions: {
                fetchPinnedMessages,
                addPinnedMessages,
                removePinnedMessages
            }

        },

        ready() {
            // trigger watch on each dispatch available for
            // the pinned messages list
            this.fetchPinnedMessages();
            this.addPinnedMessages();
            this.removePinnedMessages();
        }
        
    }

</script>