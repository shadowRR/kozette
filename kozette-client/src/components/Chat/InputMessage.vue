<template>

    <textarea class="input-message" v-model="inputMessage" placeholder="write here, you bitch." autofocus
              autocomplete="off" v-on:keydown.enter="sendMessage"></textarea>

</template>

<script type="text/babel">

    // vuex
    import { currentUser, getUsersList } from '../../vuex/getters/users';
    // lib
    import Commands from '../../plugins/kozette_commands';
    // services
    import { messageService } from '../../services';

    export default {

        data() {
            return {
                inputMessage: ''
            }
        },

        vuex: {

            getters: { currentUser, users: getUsersList }

        },

        ready() {
            // watch for changes in the users list and
            // update accordingly the @mentions system
            this.$watch( 'users', () => {
                const usernames = this.users.map( user => user.nickname || user.email );
                const commands = [ '/nick', '/color', '/me', '/status', '/pin', '/mute', '/notify' ];
                $( '.input-message' )
                        .atwho( { at: '@', data: usernames, insertTpl: "${name}" } )
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
                if ( !e.shiftKey && !e.ctrlKey ) {

                    e.preventDefault();

                    const text = this.inputMessage.trim();

                    // if empty message, stop here
                    if ( text.length == 0 )
                        return;

                    Commands.isCommand( text ) ?
                            // execute the command if it is one
                            Commands.executeCommand( text, this.currentUser ) :
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