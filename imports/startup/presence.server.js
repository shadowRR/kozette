/*
 ██████╗ ██████╗ ███████╗███████╗███████╗███╗   ██╗ ██████╗███████╗
 ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝████╗  ██║██╔════╝██╔════╝
 ██████╔╝██████╔╝█████╗  ███████╗█████╗  ██╔██╗ ██║██║     █████╗
 ██╔═══╝ ██╔══██╗██╔══╝  ╚════██║██╔══╝  ██║╚██╗██║██║     ██╔══╝
 ██║     ██║  ██║███████╗███████║███████╗██║ ╚████║╚██████╗███████╗
 ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝
 ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗
 ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
 ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
 ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
 ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
 ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
 */

import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {SyncedCron} from 'meteor/percolate:synced-cron';
import {Message} from '../api/messages/messages.collections.js';
import {UsersLogging} from '../api/users/users_logging.collections';

import moment from 'moment';

Meteor.startup(function() {

    // check online status of users every 4 minutes
    SyncedCron.add( {
        name: 'Checking online status of users',
        schedule: function ( parser ) {
            // parser is a later.parse object
            return parser.text( 'every 4 minutes' );
        },
        job: function () {

            Meteor.users.find( { 'profile.connection': 'online' } ).forEach( function ( user ) {

                const user_id = user._id,
                    four_minutes_ago = moment().subtract( 4, 'minutes' ).toDate();

                // if user hasn't been checking in for the last four minutes, we considered him offline
                const selector = { user_id, updated_at: { $gt: four_minutes_ago } };
                if ( UsersLogging.find( selector ).count() === 0 ) {

                    Meteor.users.update( user_id, { $set: { 'profile.connection': 'offline' } } );

                    let message = new Message();
                    message.set( { user_id, message: 'has left. Like a bitch.', type: 'status' } );
                    message.validate() && message.save();

                }
            } );

        }
    } );
    SyncedCron.start();

    Accounts.onLogin( function () {

        const user_id = Meteor.userId(),
            four_minutes_ago = moment().subtract( 4, 'minutes' ).toDate();

        // only add a status message if the user isn't logged in on another device
        const selector = { user_id, updated_at: { $gt: four_minutes_ago } };
        if ( UsersLogging.find( selector ).count() < 2) {
            let message = new Message();
            message.set( { user_id, message: 'is online. And nobody cares.', type: 'status' } );
            message.validate() && message.save();
        }

    } );
    
});