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
        // prepare the sound to trigger
        // when receiving a new message
        let sound = new Audio( '/kozette_message.mp3' );
        let query = Messages.find( {}, { sort: { created_at: 1 } } );
        query.observe( {
            added( doc ) {
                // if new message not from the connected
                // user and of type 'basic',
                //  trigger the new message sound
                if ( Meteor.userId() != doc.user_id && doc.type === 'basic' ) {
                    // if mute mode isn't active
                    if ( !Session.get( 'mute' ) )
                        sound.play();
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

/* --- oncreated --- */
Template.tchat.onCreated( function () {
    var self = this;

    self.autorun( function () {
        self.subscribe( 'messages.list' );
        self.subscribe( 'messages.pinned.list' );
    } );
} );