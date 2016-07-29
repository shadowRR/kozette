<template>

    <!-- chat -->
    <section v-on:scroll="isScrolling" id="message-list" class="split">
        <message-list></message-list>
    </section>

    <!-- input message -->
    <section id="input-message" class="split">
        <input-message></input-message>
    </section>

</template>

<script type="text/babel">

    // lib
    import Split from 'split.js';
    // components
    import MessageList from './MessageList.vue';
    import InputMessage from './InputMessage.vue';
    // vuex
    import { fetchMoreMessages } from '../../vuex/actions/messages';

    export default {

        components: { MessageList, InputMessage },

        data() {
            return {
                autoScrollingActive: true
            }
        },

        vuex: {

            actions: { fetchMoreMessages }

        },

        ready() {
            // split message list and input message
            Split( [ '#message-list', '#input-message' ], {
                direction: 'vertical',
                sizes: [ 92, 8 ],
                minSize: [ 400, 30 ],
                gutterSize: 8,
                cursor: 'row-resize'
            } );

            this.scrollToBottom();
            setInterval( () => this.autoScrollingActive && this.scrollToBottom() , 1000 );

        },

        methods: {

            /**
             * @summary detect when scrolling the message list
             */
            isScrolling() {
                const how_close = 80,  // pixels leeway to be considered "at Bottom"
                    message_list = $( '#message-list' ),
                    scroll_height = message_list.prop( "scrollHeight" ),
                    scroll_bottom = message_list.prop( "scrollTop" ) + message_list.height();
                // set the autoScrolling boolean depending on if we are
                // close enough from the bottom of the message list
                this.autoScrollingActive = scroll_bottom > ( scroll_height - how_close );

                // now check if we are on top on the message list, so we can load
                // more message for history purpose
                const pos = message_list.prop( "scrollTop" );
                if ( pos == 0 ) this.fetchMoreMessages();
            },

            /**
             * @summary scroll to bottom of the message list
             */
            scrollToBottom() {
                const last_message = $( '.message-item' ).last()[ 0 ];
                last_message && last_message.scrollIntoView();
            }

        }
        
    }

</script>