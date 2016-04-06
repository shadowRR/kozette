import {Meteor} from 'meteor/meteor';
import {Message} from '../messages/messages.collections';
import {MessagePinned} from '../messages_pinned/messages_pinned.collections';
import {Kozette} from './kozette.init';
import {Roles} from 'meteor/alanning:roles';

let command = {
    /**
     * @summary return if message is a command
     * @param {string} message
     * @return {Boolean}
     */
    isCommand( message ) {
        const reg = /^\/(nick|color|me|status|pin|help|mute|unmute|kick-user|delete-user)\b/;
        return reg.test( message );
    },
    /**
     * @summary execute specified command
     * @param  {string} command
     * @return
     */
    executeCommand( command ) {
        // for the nick command
        const nickRegEx = /^\/nick\b/;
        if ( nickRegEx.test( command ) ) {
            const nick = command.substring( command.indexOf( ' ' ) + 1 );
            Meteor.call( 'user.set.username', nick );
            return;
        }
        // for the color command
        const colorRegEx = /^\/color\b/;
        if ( colorRegEx.test( command ) ) {
            const color = command.substring( command.indexOf( ' ' ) + 1 );
            Meteor.users.update( Meteor.userId(), { $set: { 'profile.color': color } } );
            return;
        }
        // for the /me command
        const meRegEx = /^\/me\b/;
        if ( meRegEx.test( command ) ) {
            let message = new Message();
            const text = command.substring( command.indexOf( ' ' ) + 1 );
            message.set( { user_id: Meteor.userId(), message: text, type: 'info' } );
            message.validate() && Meteor.call( 'message.insert', message, ( err ) => {
                if ( err )console.log( err );
            } );
            return;
        }
        // for the /status command
        const statusRegEx = /^\/status\b/;
        if ( statusRegEx.test( command ) ) {
            let text = '';
            if ( command.indexOf( ' ' ) > -1 ) text = command.substring( command.indexOf( ' ' ) + 1 );
            Meteor.users.update( Meteor.userId(), { $set: { 'profile.status': text } } );
            return;
        }
        // for the /pin command
        const pinRegEx = /^\/pin\b/;
        if ( pinRegEx.test( command ) ) {
            let text = command.substring( command.indexOf( ' ' ) + 1 );
            // base message
            let message = new Message();
            message.set( { user_id: Meteor.userId(), message: text, type: 'basic' } );
            message.validate() && Meteor.call( 'message.insert', message, ( err ) => {
                if ( err )console.log( err );
            } );
            // pinned message
            let message_pinned = new MessagePinned();
            message_pinned.set( { user_id: Meteor.userId(), message: text } );
            message_pinned.validate() && Meteor.call( 'message.pinned.insert', message_pinned, ( err ) => {
                if ( err )console.log( err );
            } );
            return;
        }
        // for the help command
        const helpRegEx = /^\/help\b/;
        if ( helpRegEx.test( command ) ) {
            return;
        }
        // for the mute command
        const muteRegEx = /^\/mute\b/;
        if ( muteRegEx.test( command ) ) {
            Meteor.users.update( Meteor.userId(), { $set: { 'profile.mute': true } } );
        }
        // for the unmute command
        const unmuteRegEx = /^\/unmute\b/;
        if ( unmuteRegEx.test( command ) ) {
            Meteor.users.update( Meteor.userId(), { $set: { 'profile.mute': false } } );
        }
        // for the kick-user command (admin/moderator)
        const kickUserRegEx = /^\/kick-user\b/;
        if ( kickUserRegEx.test( command ) ) {
            let username = command.substring( command.indexOf( ' ' ) + 1 );
            // for convience, check that a username was specified and
            // that the user requesting the command is admin and moderator
            if ( username && Roles.userIsInRole( Meteor.userId(), [ 'admin', 'moderator' ] ) ) {
                Meteor.call( 'user.kick', username, ( err ) => {
                    if ( err ) console.log( err );
                } );
            }
        }
        // for the delete-user command (admin)
        const deleteUserRegEx = /^\/delete-user\b/;
        if ( deleteUserRegEx.test( command ) ) {
            let username = command.substring( command.indexOf( ' ' ) + 1 );
            // for convience, check that a username was specified and
            // that the user requesting the command is admin
            if ( username && Roles.userIsInRole( Meteor.userId(), [ 'admin' ] ) ) {
                Meteor.call( 'user.delete', username, ( err ) => {
                    if ( err ) console.log( err );
                } );
            }
        }
    }
};

Kozette.public.command = {};
_.extend( Kozette.public.command, command );
