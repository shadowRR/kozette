<template>

    <span class="message-date">[{{getTime}}]</span>
    <span class="username" v-bind:style="{color: message.user.color}">{{message.user.nickname || message.user.email}}</span>
    <span class="message-content">{{{text}}}</span>

</template>

<script type="text/babel">

    import _ from 'lodash';
    import moment from 'moment';
    import marked from 'marked';
    import highlight from 'highlight.js';

    // set hightlight option
    marked.setOptions( {
        highlight: function ( code ) {
            return highlight.highlightAuto( code ).value;
        }
    } );

    export default {
        props: [ 'message' ],
        computed: {
            /**
             * @summary format the time of the message
             * @returns {string}
             */
            getTime() {
                return moment( this.message.created_at ).format( 'HH:mm' );
            },
            /**
             * @summary format markdown
             */
            text() {
                return marked( this.message.text );
            }
        }
    }

</script>