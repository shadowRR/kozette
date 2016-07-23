<template>

    <div>

        <!-- pinned message controls -->
        <div class="message-pinned">
            <span class="message-date-alt">[{{since}}]</span>
            <a v-if="owner" class="blue-link remove-pinned" v-on:click="unpin">[ X ]</a>
        </div>

        <!-- pinned message infos -->
        <div style="padding-top: 10px;">
            <span v-bind:style="{color: color}">{{nickname}}</span>
            {{message.text}}
        </div>

    </div>

</template>

<script type="text/babel">

    // lib
    import _ from 'lodash';
    import moment from 'moment';
    // users list
    import {getUsersList} from '../../vuex/users_getters.js';
    // current user
    import {currentUser} from '../../vuex/currentUser_getters';
    // message service
    import {messageService} from '../../services';

    export default {

        props: [ 'message' ],

        data() {
            return {
                since: ''
            };
        },

        vuex: {

            getters: {
                currentUser,
                users: getUsersList
            }

        },

        ready() {
            // update the time since the message was pinned
            const get_time = () => moment( this.message.created_at ).fromNow();
            setInterval( () => this.since = get_time(), 1000 * 60 );
            this.since = get_time(); // execute on load
        },

        computed: {

            /**
             * @summary return if current user if owner of
             * the pinned message
             * @returns {boolean}
             */
            owner() {
                return this.currentUser === this.message.user_id;
            },

            /**
             * @summary get the color of the owner of
             * the pinned message
             * @returns {string}
             */
            color() {
                const user = _.find( this.users, user => (user._id === this.message.user_id) );
                return user && user.color;
            },

            /**
             * @summary get the nickname of the owner of
             * the pinned message
             * @returns {string}
             */
            nickname() {
                const user = _.find( this.users, user => (user._id === this.message.user_id) );
                return user && user.nickname;
            }

        },

        methods: {

            /**
             * @summary unpin the message
             */
            unpin() {
                // remove the pin on the message
                messageService.patch( this.message._id, { pinned: false } )
                        .catch( err => console.error( err ) );
            }

        }
        
    }

</script>