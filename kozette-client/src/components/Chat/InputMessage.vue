<template>

    <textarea class="input-message" v-model="inputMessage" placeholder="write here, you bitch." autofocus
              autocomplete="off" v-on:keyup.enter="sendMessage"></textarea>

</template>

<script type="text/babel">

    import {currentUser} from '../../vuex/currentUser_getters';
    import {getUsersList} from '../../vuex/users_getters.js';
    import Commands from '../../lib/kozette_commands';
    import {messageService} from '../../services';

    export default {
        vuex: {
            getters: {
                currentUser,
                users: getUsersList
            }
        },
        data() {
            return {
                inputMessage: ''
            }
        },
        ready() {
            // watch for changes in the users list and
            // update accordingly the @mentions system
            this.$watch( 'users', () => {
                const usernames = this.users.map( user => user.nickname || user.email );
                const commands = [ '/nick', '/color', '/me', '/status', '/pin', '/mute', '/unmute' ];
                $( '.input-message' )
                        .atwho( { at: '@', data: usernames } )
                        .atwho( { at: '/', data: commands, insertTpl: "${name}", limit: 30 } );
            } );
        },
        methods: {
            /**
             * @summary send a new message
             * @param e
             * @return
             */
            sendMessage( e ) {

                // if user isn't trying to just add a newline
                if ( !e.shiftKey ) {
                    const text = this.inputMessage,
                            isCommand = Commands.isCommand( text );

                    isCommand ?
                            // execute the command is it is one
                            Commands.executeCommand( text, this.currentUser.data._id ) :
                            // otherwise, normal behavior, add the message
                            messageService.create( { text: this.inputMessage } )
                                    .catch( err => console.error( err ) );

                    // in any case, empty the message input
                    this.inputMessage = '';
                }

            }
        }
    }

</script>