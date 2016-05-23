'use strict';

import * as services from '../services';

export default {
    /**
     * @summary return if message is a command
     * @param {string} message
     * @return {Boolean}
     */
    isCommand( message ) {
        const reg = /^\/(nick|color|me|status|pin|mute|unmute)\b/;
        return reg.test( message );
    },
    /**
     * @summary execute specified command
     * @param {string} command
     * @param {string} currentUserId
     * @return
     */
    executeCommand( command, currentUserId ) {

        // for the nick command
        const nickRegEx = /^\/nick\b/;
        if ( nickRegEx.test( command ) ) {
            const nickname = command.substring( command.indexOf( ' ' ) + 1 );
            services.userService.patch(
                currentUserId,
                { nickname },
                err => {
                    if ( err ) console.error( err );
                } );
            return;
        }

        // for the color command
        const colorRegEx = /^\/color\b/;
        if ( colorRegEx.test( command ) ) {
            const color = command.substring( command.indexOf( ' ' ) + 1 );
            services.userService.patch(
                currentUserId,
                { color },
                err => {
                    if ( err ) console.error( err );
                }
            );
            return;
        }

        // for the /me command
        const meRegEx = /^\/me\b/;
        if ( meRegEx.test( command ) ) {
            //let message = new Message();
            const text = command.substring( command.indexOf( ' ' ) + 1 );
            //message.set( { user_id: Meteor.userId(), message: text, type: 'info' } );
            // message.validate() && Meteor.call( 'message.insert', message, ( err ) => {
            //     if ( err )console.log( err );
            // } );
            return;
        }

        // for the /status command
        const statusRegEx = /^\/status\b/;
        if ( statusRegEx.test( command ) ) {
            let text = '';
            if ( command.indexOf( ' ' ) > -1 ) text = command.substring( command.indexOf( ' ' ) + 1 );
            services.userService.patch(
                currentUserId,
                { 'status.message': text },
                err => {
                    if ( err ) console.error( err )
                }
            );
            return;
        }

        // for the /pin command
        const pinRegEx = /^\/pin\b/;
        if ( pinRegEx.test( command ) ) {
            let text = command.substring( command.indexOf( ' ' ) + 1 );
            services.messageService.create( { text, pinned: true } )
                .catch( err => console.error( err ) );
            return;
        }

        // for the mute command
        const muteRegEx = /^\/mute\b/;
        if ( muteRegEx.test( command ) ) {
            services.userService.patch(
                currentUserId,
                { 'status.muted': true },
                err => {
                    if ( err ) console.log( err );
                }
            );
        }

        // for the unmute command
        const unmuteRegEx = /^\/unmute\b/;
        if ( unmuteRegEx.test( command ) ) {
            services.userService.patch(
                currentUserId,
                { 'status.muted': false },
                err => {
                    if ( err ) console.log( err );
                }
            );
        }

    }
};
