/*
 ███╗   ███╗███████╗███████╗███████╗ █████╗  ██████╗ ███████╗    ██████╗  █████╗ ███████╗██╗ ██████╗
 ████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝ ██╔════╝    ██╔══██╗██╔══██╗██╔════╝██║██╔════╝
 ██╔████╔██║█████╗  ███████╗███████╗███████║██║  ███╗█████╗      ██████╔╝███████║███████╗██║██║
 ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══██║██║   ██║██╔══╝      ██╔══██╗██╔══██║╚════██║██║██║
 ██║ ╚═╝ ██║███████╗███████║███████║██║  ██║╚██████╔╝███████╗    ██████╔╝██║  ██║███████║██║╚██████╗
 ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝
 */

import './message_basic.html';

import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Showdown} from 'meteor/markdown';

/* --- helpers --- */
Template.message_basic.helpers( {
    /**
     * @summary convert markdown and trigger the
     * highlight on the username
     * @return message
     */
    message() {

        // init and execute the markdown converter
        const converter = new Showdown.converter();
        let message = converter.makeHtml( this.message );

        // only if it's not the actual writer of the message
        if ( Meteor.userId() != this.user_id ) {
            // regex to select the user username
            const reg = new RegExp( `\\b(${Meteor.user().username})\\b`, 'gm' );
            let name_split = message.split( reg );

            // if the username actually occurs
            if ( name_split.length > 1 ) {
                const user_string = `<span style="background: ${Meteor.user().profile.color}">${name_split[ 1 ]}</span>`;
                message = message.replace( reg, user_string );
            }

        }

        return message;
    }
} );