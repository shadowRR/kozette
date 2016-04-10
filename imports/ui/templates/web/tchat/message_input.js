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

        // on enter key
        if ( e.keyCode == 13 ) {

            const message = $( '[name=message]' ).val() || null,
                user_id = Meteor.userId();

            if ( Kozette.public.command.isCommand( message ) ) {

                Kozette.public.command.executeCommand( message );
                
            } else {

                let message_doc = new Message();
                message_doc.set( { user_id, message, type: 'basic' } );

                if ( message_doc.validate() ) {

                    Meteor.call( 'message.insert', message_doc, err => {
                        if ( err )console.log( err );
                        Session.set( 'autoScrollingActive', true );
                    } );

                }

            }

            $( '[name=message]' ).val( '' );

        }
    }
} );