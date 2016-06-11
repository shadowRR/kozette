<template>

    <span class="message-date">[{{getTime}}]</span>
    <span class="username"
          v-bind:style="{color: message.user.color}">{{message.user.nickname || message.user.email}}</span>
    <span v-bind:id="message._id" class="message-content">{{{embedText}}}</span>

</template>

<script type="text/babel">

    // lib
    import _ from 'lodash';
    import moment from 'moment';
    import marked from 'marked';
    import hljs from 'highlight.js';
    import EmbedJS from 'embed-js';
    // vuex
    import { getUsersList } from '../../../vuex/users_getters';
    import { currentUser } from '../../../vuex/currentUser_getters';

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
            const content = new EmbedJS( {
                input: this.message.text,
                marked: true,
                highlightCode: true,
                emoji: false,
                inlineEmbed: 'all',
                googleAuthKey: 'AIzaSyATK9E2VieJbQGX-D4jwA2WDDYPpwlyS6s',
                plugins: {
                    marked: marked,
                    highlightjs: hljs
                }
            } );
            content.text( result => this.embedText = result );
        },

        computed: {

            /**
             * @summary format the time of the message
             * @returns {string}
             */
            getTime() {
                return moment( this.message.created_at ).format( 'HH:mm' );
            },

//            /**
//             * @summary format markdown
//             */
//            text() {
//                // marked
//                let marked_text = marked( this.message.text );
//                // HighLights
//                if ( !this.currentUser != this.message.user_id ) {
//                    // get currentUser username
//                    const user = _.find( this.getUsersList, user => user._id == this.currentUser );
//                    if ( user && user.nickname ) {
//                        // regex to select the user username
//                        const reg = new RegExp( `\\b(${user.nickname})\\b`, 'gmi' );
//                        let name_split = this.message.text.split( reg );
//                        // if the username actually occurs
//                        if ( name_split.length > 1 ) {
//                            const color = user.color,
//                                    user_string = `<span style="color: ${color}; padding: 3px;">${name_split[ 1 ]}</span>`;
//
//                            marked_text = marked_text.replace( reg, user_string );
//                        }
//                    }
//                }
//                return marked_text;
//            }
        }
    }

</script>