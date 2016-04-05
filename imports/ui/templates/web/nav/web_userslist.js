/*
 ██╗   ██╗███████╗███████╗██████╗ ███████╗██╗     ██╗███████╗████████╗
 ██║   ██║██╔════╝██╔════╝██╔══██╗██╔════╝██║     ██║██╔════╝╚══██╔══╝
 ██║   ██║███████╗█████╗  ██████╔╝███████╗██║     ██║███████╗   ██║
 ██║   ██║╚════██║██╔══╝  ██╔══██╗╚════██║██║     ██║╚════██║   ██║
 ╚██████╔╝███████║███████╗██║  ██║███████║███████╗██║███████║   ██║
 ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚══════╝   ╚═╝   
 */

import './web_userslist.html';

import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

/* --- helpers --- */
Template.web_userslist.helpers( {
    /**
     * @summary get listing of users online
     * @returns {Cursor}
     */
    users_online() {
        return Meteor.users.find( { 'profile.connection': 'online' } );
    },
    /**
     * @summary get listing of offline users
     * @returns {Cursor}
     */
    users_offline() {
        return Meteor.users.find( { 'profile.connection': 'offline' } );
    },
    /**
     * @summary get the mute field value for the specified user
     * @returns {*}
     */
    mute() {
        const user = this;
        return Meteor.users.findOne(user._id).profile.mute;
    }
} );

/* --- oncreated --- */
Template.web_userslist.onCreated( function () {
    let self = this

    self.autorun( () => {
        self.subscribe( 'users.list' );
    } );
} );