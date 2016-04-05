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
            const reg = new RegExp( `\\b(${Meteor.user().username})\\b`, 'gmi' );
            let name_split = message.split( reg );

            // if the username actually occurs
            if ( name_split.length > 1 ) {

                const background = Meteor.user().profile.color,
                    lum = -0.5;

                // validate hex string
                let hex = String( background ).replace( /[^0-9a-f]/gi, '' );
                if ( hex.length < 6 ) {
                    hex = hex[ 0 ] + hex[ 0 ] + hex[ 1 ] + hex[ 1 ] + hex[ 2 ] + hex[ 2 ];
                }

                // convert to decimal and change luminosity
                let color = "#", c, i;
                for ( i = 0; i < 3; i++ ) {
                    c = parseInt( hex.substr( i * 2, 2 ), 16 );
                    c = Math.round( Math.min( Math.max( 0, c + (c * lum) ), 255 ) ).toString( 16 );
                    color += ("00" + c).substr( c.length );
                }

                const user_string = `<span style="background: ${background}; color: ${color}">${name_split[ 1 ]}</span>`;
                message = message.replace( reg, user_string );
            }

        }

        return message;
    }
} );