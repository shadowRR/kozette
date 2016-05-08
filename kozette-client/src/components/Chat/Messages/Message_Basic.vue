<template>

    <span class="message-date">[{{getTime}}]</span>
    <span class="username" v-bind:style="{color: getUser.color}">{{getUser.nickname || getUser.email}}</span>
    <span class="message-content">{{{text}}}</span>

</template>

<script type="text/babel">

    import _ from 'lodash';
    import moment from 'moment';
    import marked from 'marked';
    import highlight from 'highlight.js';
    import {getUsersList} from '../../../vuex/users_getters.js';

    // set hightlight option
    marked.setOptions( {
        highlight: function ( code ) {
            return highlight.highlightAuto( code ).value;
        }
    } );

    export default {
        props: [ 'message' ],
        data() {
            return { user: {} };
        },
        vuex: {
            getters: {
                users: getUsersList
            }
        },
        computed: {
            /**
             * @summary format the time of the message
             * @returns {string}
             */
            getTime() {
                return moment( this.message.created_at ).format( 'HH:mm' );
            },
            /**
             * @summary find the user data
             * @returns {object}
             */
            getUser() {
                // find the user data
                return _.find( this.users, u => {
                            return u._id == this.message.user_id;
                        } ) || {};
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