/*
 █████╗  ██████╗ ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗
 ██╔══██╗██╔════╝██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝
 ███████║██║     ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║
 ██╔══██║██║     ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║
 ██║  ██║╚██████╗╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║
 ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   
 */

import './web_account.html';

import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

/* --- events --- */
Template.web_account.events( {
    /**
     * @summary logout the user
     * @param e
     */
    'click .red-link'( e ) {
        Meteor.logout();
    }
} );