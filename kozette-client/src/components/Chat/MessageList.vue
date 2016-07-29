<template>

    <div v-for="message in messages | orderBy 'created_at'" class="message-item" track-by="_id">
        <message :message="message"></message>
    </div>

</template>

<script type="text/babel">

    // vuex
    import { fetchMessages, addMessage } from '../../vuex/actions/messages';
    import { getMessagesList } from '../../vuex/getters/messages';
    // components
    import Message from './Message.vue';

    export default {
        
        components: { Message },

        vuex: {

            getters: { messages: getMessagesList },

            actions: { fetchMessages, addMessage }
            
        },

        ready() {
            this.fetchMessages();
            this.addMessage();
        }

    };

</script>