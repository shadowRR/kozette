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
Template.web_userslist.helpers({
    /**
     * @summary get listing of users online
     * @returns {*}
     */
    users() {
        return Meteor.users.find({'profile.connection': 'online'});
    }
});

/* --- oncreated --- */
Template.web_userslist.onCreated(function() {
    let self = this

    self.autorun(() => {
        self.subscribe('users.list');
    });
});