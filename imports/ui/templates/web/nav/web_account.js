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
import {UserLogging} from '../../../../api/users/users_logging.collections';

/* --- events --- */
Template.web_account.events( {
    /**
     * @summary logout the user
     */
    'click .red-link'() {

        const logging_id = UserLogging.findOne()._id;

        Meteor.call( 'user.logout', logging_id, ( err ) => {
            if ( !err )
                Meteor.logout();
        } );

    }
} );

/* --- oncreated --- */
Template.web_account.onCreated( function () {

    // update the logging every 30 seconds so
    // the server knows if the user is still connected
    Meteor.setInterval( function () {

        const logging = UserLogging.findOne();
        Meteor.call( 'user.update.logging', logging._id, ( err ) => {
            if ( err )console.log( err );
        } );

    }, 30 * 1000 );

} );