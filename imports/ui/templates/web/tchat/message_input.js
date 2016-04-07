/*
 ███╗   ███╗███████╗███████╗███████╗ █████╗  ██████╗ ███████╗
 ████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝ ██╔════╝
 ██╔████╔██║█████╗  ███████╗███████╗███████║██║  ███╗█████╗
 ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══██║██║   ██║██╔══╝
 ██║ ╚═╝ ██║███████╗███████║███████║██║  ██║╚██████╔╝███████╗
 ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
 ██╗███╗   ██╗██████╗ ██╗   ██╗████████╗
 ██║████╗  ██║██╔══██╗██║   ██║╚══██╔══╝
 ██║██╔██╗ ██║██████╔╝██║   ██║   ██║
 ██║██║╚██╗██║██╔═══╝ ██║   ██║   ██║
 ██║██║ ╚████║██║     ╚██████╔╝   ██║
 ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝    ╚═╝
 */

import './message_input.html';

import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Message} from '../../../../api/messages/messages.collections';
import {Kozette} from '../../../../api/kozette/kozette.init';

import {Roles} from 'meteor/alanning:roles';

Template.message_input.helpers( {
    /**
     * @summary init the autocomplete system
     */
    initAutoComplete() {

        const usernames = Meteor.users.find().map( ( user ) => {
            return user.username;
        } );

        let commands = [ '/nick', '/color', '/me', '/status', '/pin', '/mute', '/unmute' ];
        // add admin commands
        if ( Roles.userIsInRole( Meteor.userId(), [ 'admin' ] ) )
            commands = commands.concat( [ '/kick-user', '/delete-user', '/set-moderator', '/remove-moderator' ] );
        // add moderator commands
        if ( Roles.userIsInRole( Meteor.userId(), [ 'moderator' ] ) )
            commands = commands.concat( [ '/kick-user' ] );


        $( '#message-input' )
            .atwho( {
                at: '@',
                data: usernames,
                insertTpl: "${name}"
            } )
            .atwho( {
                at: '/',
                data: commands,
                insertTpl: "${name}",
                limit: 30
            } );

    }
} );

/* --- events --- */
Template.message_input.events( {
    /**
     * @summary add a new message event
     * @param e
     */
    'keypress input[name=message]'( e ) {
        if ( e.keyCode == 13 ) {
            const text = $( '[name=message]' ).val() || null;

            if ( Kozette.public.command.isCommand( text ) ) {
                Kozette.public.command.executeCommand( text );
                $( '[name=message]' ).val( '' );
            } else {
                let message = new Message();
                message.set( {
                    user_id: Meteor.userId(),
                    message: text,
                    type: 'basic'
                } );
                if ( message.validate() ) {
                    Meteor.call( 'message.insert', message, ( err ) => {
                        if ( err )console.log( err );
                    } );
                    $( '[name=message]' ).val( '' );
                }
            }
        }
    }
} );