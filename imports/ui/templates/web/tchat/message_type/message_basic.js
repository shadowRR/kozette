/*
 ███╗   ███╗███████╗███████╗███████╗ █████╗  ██████╗ ███████╗    ██████╗  █████╗ ███████╗██╗ ██████╗
 ████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝ ██╔════╝    ██╔══██╗██╔══██╗██╔════╝██║██╔════╝
 ██╔████╔██║█████╗  ███████╗███████╗███████║██║  ███╗█████╗      ██████╔╝███████║███████╗██║██║
 ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══██║██║   ██║██╔══╝      ██╔══██╗██╔══██║╚════██║██║██║
 ██║ ╚═╝ ██║███████╗███████║███████║██║  ██║╚██████╔╝███████╗    ██████╔╝██║  ██║███████║██║╚██████╗
 ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝
 */

import './message_basic.html';
import '../tooltip/tooltip.html';

import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Showdown} from 'meteor/markdown';
import {Blaze} from 'meteor/blaze';

import '../../../../../lib/tooltipster.js';

/* --- helpers --- */
Template.message_basic.helpers( {
    /**
     * @summary convert markdown and trigger the
     * highlight on the username
     * @return message
     */
    message() {

        const message_doc = this;
        let message = message_doc.message;

        // only if it's not the actual writer of the message
        if ( Meteor.userId() != message_doc.user_id ) {
            // regex to select the user username
            const reg = new RegExp( `\\b(${Meteor.user().username})\\b`, 'gmi' );
            let name_split = message.split( reg );

            // if the username actually occurs
            if ( name_split.length > 1 ) {
                const color = Meteor.user().profile.color,
                    border = `border-left: 1px solid ${color}; border-right: 1px solid ${color}`,
                    user_string = `<span style="${border}">${name_split[ 1 ]}</span>`;

                message = message.replace( reg, user_string );
            }

        }

        // let's handle links if there's any
        if ( message_doc.links && message_doc.links.length > 0 ) {

            let reg_links, span_string, value;

            // encapsulate in a span each link
            message_doc.links.forEach( link => {

                // escaping so the string is properly handle in the regexp
                value = link.value.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&" );

                reg_links = new RegExp( `\\b(${value})\\b`, 'g' );
                span_string = `<span class="tooltip">${link.value}</span>`;

                message = message.replace( reg_links, span_string );

            } );
        }

        // init and execute the markdown converter
        //const converter = new Showdown.converter();
        //message = converter.makeHtml( message_doc.message );

        return message;
    }
} );

/* --- events --- */
Template.message_basic.events( {
    /**
     * @summary on mouse hovering on a tooltip span
     * init and show the embed corresponding
     * @param e
     */
    'mouseenter .tooltip'( e ) {

        let selected_link;

        const value = e.currentTarget.innerText;
        this.links.forEach( link => {
            if ( link.value = value )
                selected_link = link;
        } );

        const tmpl = Blaze.toHTMLWithData( Template.tooltip, selected_link );

        // init the tooltip if that's not already the case
        if ( !$( e.currentTarget ).hasClass( 'tooltipstered' ) ) {
            $( e.currentTarget ).tooltipster( {
                content: 'Loading',
                contentAsHTML: true,
                interactive: true,
                maxWidth: 500,
                content: tmpl
            } );
            $( e.currentTarget ).tooltipster( 'show' );
        }
        else {
            $( e.currentTarget ).tooltipster( 'content', tmpl );
        }

    }
} );