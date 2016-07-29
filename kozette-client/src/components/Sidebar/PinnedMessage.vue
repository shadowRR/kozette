<template>

    <div>

        <!-- pinned message controls -->
        <div class="message-pinned">

            <!-- time count -->
            <span class="message-date-alt">[{{since}}]</span>

            <!-- can remove pinned message if owner -->
            <a v-if="this.currentUser === this.message.user_id" 
                class="blue-link remove-pinned" v-on:click="unpin">[ X ]</a>

        </div>

        <!-- pinned message infos -->
        <div style="padding-top: 10px;">
            <span v-bind:style="{color: user.color}">{{user.nickname}}</span>
            {{message.text}}
        </div>

    </div>

</template>

<script type="text/babel">

    // lib
    import _ from 'lodash';
    import moment from 'moment';
    // vuex
    import { getUsersList, currentUser } from '../../vuex/getters/users';
    // services
    import { messageService } from '../../services';

    export default {

        props: [ 'message' ],

        data() {
            return {
                user: {},
                since: ''
            };
        },

        vuex: {

            getters: { currentUser, users: getUsersList }

        },

        ready() {
            // get the message user infos        
            this.user = _.find( this.users, user => user._id === this.message.user_id );
        },

        computed: {

            /**
             * @summary return if current user if owner of the pinned message
             * @returns {boolean}
             */
            owner() {
                return this.currentUser === this.message.user_id;
            }

        },

        methods: {

            /**
             * @summary update the time since the message was pinned
             */
            getTimeTallying() {
                const get_time = () => moment( this.message.created_at ).fromNow();
                setInterval( () => this.since = get_time(), 1000 * 60 );
                this.since = get_time();
            },

            /**
             * @summary unpin the message
             */
            unpin() {
                messageService.patch( this.message._id, { pinned: false } )
                    .catch( err => console.error( err ) );
            }

        }
        
    }

</script>