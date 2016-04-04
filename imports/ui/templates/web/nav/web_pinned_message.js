/*
 ██████╗ ██╗███╗   ██╗███╗   ██╗███████╗██████╗
 ██╔══██╗██║████╗  ██║████╗  ██║██╔════╝██╔══██╗
 ██████╔╝██║██╔██╗ ██║██╔██╗ ██║█████╗  ██║  ██║
 ██╔═══╝ ██║██║╚██╗██║██║╚██╗██║██╔══╝  ██║  ██║
 ██║     ██║██║ ╚████║██║ ╚████║███████╗██████╔╝
 ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝╚═════╝
 ███╗   ███╗███████╗███████╗███████╗ █████╗  ██████╗ ███████╗███████╗
 ████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝ ██╔════╝██╔════╝
 ██╔████╔██║█████╗  ███████╗███████╗███████║██║  ███╗█████╗  ███████╗
 ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══██║██║   ██║██╔══╝  ╚════██║
 ██║ ╚═╝ ██║███████╗███████║███████║██║  ██║╚██████╔╝███████╗███████║
 ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
 */

import './web_pinned_message.html';

import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

/* --- helpers --- */
Template.web_pinned_message.helpers( {
    /**
     * @summary get the current user data
     * @return {object}
     */
    user() {
        return Meteor.users.findOne( this.user_id );
    },
    /**
     * @summary check if pinned message owner
     * @return {Boolean}
     */
    owner() {
        return this.user_id === Meteor.userId();
    },
    /**
     * @summary parse message for links
     * @return {String}
     */
    parseMessage() {
        return this.message;
    }
} );

/* --- events --- */
Template.web_pinned_message.events( {
    /**
     * @summary un-pin a message
     */
    'click .remove-pinned'() {
        const pinned = this;

        Meteor.call( 'message.pinned.remove', pinned, ( err ) => {
            if ( err )console.log( err );
        } );
    }
} );