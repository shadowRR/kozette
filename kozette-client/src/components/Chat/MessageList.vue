<template>

    <div class="message-item" v-for="message in messages" track-by="_id">
        <message-basic :message="message"></message-basic>
    </div>

</template>

<script type="text/babel">

    import {fetchMessages, addMessage} from '../../vuex/messages_actions.js';
    import {getMessagesList} from '../../vuex/messages_getters';
    import MessageBasic from './Messages/Message_Basic.vue';

    export default {
        components: { MessageBasic },
        vuex: {
            getters: {
                messages: getMessagesList
            },
            actions: {
                fetchMessages,
                addMessage
            }
        },
        ready() {
            // init messages state
            this.fetchMessages();
            this.addMessage();
        }
    };

</script>