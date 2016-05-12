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

    /**
     * @summary scroll to bottom of the message list
     */
    const scrollToBottom = () => {
        const last_message = $( '.message-item' ).last()[ 0 ];
        last_message && last_message.scrollIntoView();
    };

    export default {
        components: { MessageList, InputMessage },
        data() {
            return {
                autoScrollingActive: true
            }
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

            // scroll on load the first time
            scrollToBottom();
            // interval for autoScrolling behavior
            setInterval( () => {
                this.autoScrollingActive && scrollToBottom();
            }, 1000 );

        },
        methods: {
            /**
             * @summary detect when scrolling the message list
             */
            isScrolling() {
                const how_close = 80,  // pixels leeway to be considered "at Bottom"
                        message_list = $( "#message-list" ),
                        scroll_height = message_list.prop( "scrollHeight" ),
                        scroll_bottom = message_list.prop( "scrollTop" ) + message_list.height();
                // set the autoScrolling boolean depending on if we are
                // close enough from the bottom of the message list
                this.autoScrollingActive = scroll_bottom > (scroll_height - how_close);
            }
        }
    }

</script>