/*
 ████████╗ ██████╗██╗  ██╗ █████╗ ████████╗
 ╚══██╔══╝██╔════╝██║  ██║██╔══██╗╚══██╔══╝
 ██║   ██║     ███████║███████║   ██║
 ██║   ██║     ██╔══██║██╔══██║   ██║
 ██║   ╚██████╗██║  ██║██║  ██║   ██║
 ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 */

import './tchat.html';

import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {Messages} from '../../../../api/messages/messages.collections';

import './message_type/message_basic';
import './message_type/message_info.html';
import './message_type/message_status.html';

/* --- helpers --- */
Template.tchat.helpers( {
    /**
     * @summary get list of messages
     * @return {Mongo.Cursor}
     */
    messages() {

        let query = Messages.find( {}, { sort: { created_at: 1 } } );
        query.observe( {
            added( doc ) {
                // if new message not from the connected
                // user and of type 'basic',
                //  trigger the new message sound
                if ( Meteor.userId() != doc.user_id && doc.type === 'basic' ) {
                    // if mute mode isn't active
                    if ( !Meteor.user().profile.mute && !Session.get( 'window_focused' ) )
                        $( '#audio-kozette-message' )[ 0 ].play();
                }

                // increment the notification counter if the user
                // isn't focused on the window
                if ( !Session.get( 'window_focused' ) ) {
                    const notif_counter = Session.get( 'favicon_notif' );
                    Session.set( 'favicon_notif', notif_counter + 1 );
                }

            }
        } )

        return query;
    },
    /**
     * @summary get a specified user
     * @returns {any}
     */
    user() {
        return Meteor.users.findOne( this.user_id );
    },
    /**
     * @summary get message type for dynamic templates
     * @returns {*}
     */
    type() {
        return `message_${this.type}`;
    }
} );

/* --- events --- */
Template.tchat.events( {
    /**
     * @summary set the auto scroll boolean depending on
     * if the user is scrolling to see history or not
     */
    'scroll #message-list'() {
        
        const how_close = 80,  // pixels leeway to be considered "at Bottom"
            message_list = $( "#message-list" ),
            scroll_height = message_list.prop( "scrollHeight" ),
            scroll_bottom = message_list.prop( "scrollTop" ) + message_list.height(),
            at_bottom = scroll_bottom > (scroll_height - how_close);
        
        Session.set( 'autoScrollingActive', at_bottom );
    }
} );

/* --- oncreated --- */
Template.tchat.onCreated( function () {
    var self = this;

    Session.set( 'autoScrollingActive', true );

    self.autorun( function () {
        self.subscribe( 'messages.list', {
            onReady() {
                // auto scroll to bottom when the chat
                // window is first loaded
                const last_message = $( '.message-item' ).last()[ 0 ];
                last_message && last_message.scrollIntoView();
            }
        } );
        self.subscribe( 'messages.pinned.list' );
    } );
} );

/* --- onrendered --- */
Template.tchat.onRendered( function () {

    // auto scroll to bottom if the autoScrolling is active
    Meteor.setInterval( function () {
        if ( Session.get( 'autoScrollingActive' ) ) {
            const last_message = $( '.message-item' ).last()[ 0 ];
            last_message && last_message.scrollIntoView();
        }
    }, 1000 );

} );