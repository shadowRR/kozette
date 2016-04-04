/*
 ██╗      ██████╗  ██████╗ ██╗███╗   ██╗
 ██║     ██╔═══██╗██╔════╝ ██║████╗  ██║
 ██║     ██║   ██║██║  ███╗██║██╔██╗ ██║
 ██║     ██║   ██║██║   ██║██║██║╚██╗██║
 ███████╗╚██████╔╝╚██████╔╝██║██║ ╚████║
 ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝
 */

import './login.html';

import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-password';

/* --- events --- */
Template.login.events({
    /**
     * @summary login
     * @param e
     */
    'click .blue-link'( e ) {
        e.preventDefault();
        const email = $( '#username' ).val();
        const password = $( '#password' ).val();
        Meteor.loginWithPassword( email, password , (err) => { if(err)console.log(err); } );
    },
    /**
     * @summary register
     * @param e
     */
    'click .green-link'( e ) {
        e.preventDefault();
        const username = $( '#username' ).val();
        const password = $( '#password' ).val();
        Accounts.createUser( { username, password }, (err) => { if(err)console.log(err); } );
    }
});