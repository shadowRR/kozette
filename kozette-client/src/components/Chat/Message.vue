<template>

    <!-- message time -->
    <span class="message-date">[{{getTime}}]</span>

    <!-- username -->
    <span v-bind:style="{color: message.user.color}" class="username">
        {{message.user.nickname || message.user.email}}</span>

    <!-- message -->
    <span v-bind:id="message._id" v-bind:style="{color: message.type == 'me' && message.user.color}" 
        class="message-content">{{{embedText}}}</span>

</template>

<script type="text/babel">

    // lib
    import _ from 'lodash';
    import moment from 'moment';
    import marked from 'marked';
    import hljs from 'highlight.js';
    import EmbedJS from 'embed-js';
    // vuex
    import { currentUser, getUsersList } from '../../vuex/getters/users';

    export default {

        props: [ 'message' ],

        data() {
            return {
                embedText: ''
            }
        },

        vuex: {
            getters: { getUsersList, currentUser }
        },

        ready() {
            this.embedAndMarkdown();
        },

        computed: {

            /**
             * @summary format the time of the message
             * @returns {string}
             */
            getTime() {
                return moment( this.message.created_at ).format( 'HH:mm' );
            }

        },

        methods: {

            /**
             * @summary embed links and convert markdown
             */
            embedAndMarkdown() {
                const content = new EmbedJS( {
                    input: this.message.text,
                    marked: true,
                    highlightCode: true,
                    emoji: false,
                    inlineEmbed: 'all',
                    googleAuthKey: 'AIzaSyATK9E2VieJbQGX-D4jwA2WDDYPpwlyS6s',
                    plugins: { marked: marked, highlightjs: hljs }
                } );
                content.text( result => this.embedText = this.highlightUsername( result ) );
            },

            /**
             * @summary find current user username to hl
             * @param  {string} text
             * @return {string}
             */
            highlightUsername( text ) {
               // HighLights
               if ( this.currentUser != this.message.user_id ) {

                   // get currentUser username
                   const user = _.find( this.getUsersList, user => user._id == this.currentUser );

                   if ( user && user.nickname ) {

                       // regex to select the user username
                       const reg = new RegExp( `\\b(${user.nickname})\\b`, 'gmi' );
                       let name_split = text.split( reg );

                       // if the username actually occurs
                       if ( name_split.length > 1 ) {
                           const color = user.color,
                                   user_string = `<span style="color: ${color}; border-bottom: 1px solid ${color};">${name_split[ 1 ]}</span>`;
                           text = text.replace( reg, user_string );
                       }

                   }
               }
               return text;
            }

        }
    }

</script>