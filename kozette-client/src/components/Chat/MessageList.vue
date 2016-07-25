<template>

    <div v-for="message in messages | orderBy 'created_at'" class="message-item" track-by="_id">
        <message :message="message"></message>
    </div>

</template>

<script type="text/babel">

    import { fetchMessages, addMessage } from '../../vuex/messages_actions.js';
    import { getMessagesList } from '../../vuex/messages_getters';
    import MessageBasic from './Message.vue';

    export default {
        
        components: { Message },

        vuex: {

            getters: { messages: getMessagesList },

            actions: { fetchMessages, addMessage }
            
        },

        ready() {
            // init messages state
            this.fetchMessages();
            this.addMessage();
        }

    };

</script>