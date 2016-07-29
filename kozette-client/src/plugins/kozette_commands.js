'use strict';

import * as services from '../services';

export default {
    /**
     * @summary return if message is a command
     * @param {string} message
     * @return {Boolean}
     */
    isCommand( message ) {
        const reg = /^\/(nick|color|me|status|pin|mute|notify)\b/;
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
            services.userService.patch( currentUserId, { nickname } )
                .catch( err => console.error( err ) );
            return;
        }

        // for the color command
        const colorRegEx = /^\/color\b/;
        if ( colorRegEx.test( command ) ) {
            const color = command.substring( command.indexOf( ' ' ) + 1 );
            services.userService.patch( currentUserId, { color } )
                .catch( err => console.error( err ) );
            return;
        }

        // for the /me command
        const meRegEx = /^\/me\b/;
        if ( meRegEx.test( command ) ) {
            //let message = new Message();
            const text = command.substring( command.indexOf( ' ' ) + 1 );
            services.messageService.create( { text, type: 'me' } )
                .catch( err => console.error( err ) );
            return;
        }

        // for the /status command
        const statusRegEx = /^\/status\b/;
        if ( statusRegEx.test( command ) ) {
            let text = '';
            if ( command.indexOf( ' ' ) > -1 ) text = command.substring( command.indexOf( ' ' ) + 1 );
            services.userService.patch( currentUserId, { 'status.message': text } )
                .catch( err => console.error( err ) );
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

        // for the /mute command
        const muteRegEx = /^\/mute\b/;
        if ( muteRegEx.test( command ) ) {
            let text = command.substring( command.indexOf( ' ' ) + 1 );
            services.userService.patch( currentUserId, { 'status.muted': text != 'off' } )
                .catch( err => console.error( err ) );
        }

        // for the /notify command
        const notifyRegEx = /^\/notify\b/;
        if ( notifyRegEx.test( command ) ) {
            let text = command.substring( command.indexOf( ' ' ) + 1 );
            services.userService.patch( currentUserId, { 'status.notifications': text != 'off' } )
                .catch( err => console.error( err ) );
        }

    }
};
