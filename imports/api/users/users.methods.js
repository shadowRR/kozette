/*
 ██╗   ██╗███████╗███████╗██████╗ ███████╗
 ██║   ██║██╔════╝██╔════╝██╔══██╗██╔════╝
 ██║   ██║███████╗█████╗  ██████╔╝███████╗
 ██║   ██║╚════██║██╔══╝  ██╔══██╗╚════██║
 ╚██████╔╝███████║███████╗██║  ██║███████║
 ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝
 ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
 ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
 ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
 ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
 ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
 ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
 */

import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {UserLogging, UsersLogging} from './users_logging.collections';

import moment from 'moment';

Meteor.methods( {
    /**
     * @summary set a new username
     * @param nick
     * @return
     */
    'user.set.username'( nick ) {

        if ( !Meteor.user() )
            throw new Meteor.Error( 'UserNotFound', 'No user connected' );

        Accounts.setUsername( Meteor.userId(), nick );

        return;
    },
    /**
     * @summary logout user and check if the user doesn't
     * have another device connected to set the profile.connection
     * status field properly
     * @param logging_id
     * @return
     */
    'user.logout'( logging_id ) {

        if ( !Meteor.user() )
            throw new Meteor.Error( 'UserNotFound', 'No user connected' );

        const user_id = Meteor.userId(),
            four_minutes_ago = moment().subtract( 2, 'minutes' ).toDate();

        Meteor.defer( function () {

            // set the connection offline only if the user hasn't been connected
            // on another terminal for the last 4 minutes
            const selector = { _id: { $ne: logging_id }, user_id, updated_at: { $gt: four_minutes_ago } };

            if ( UsersLogging.find( selector ).count() === 0 ) {

                Meteor.users.update( user_id, { $set: { 'profile.connection': 'offline' } } );

                // add the status message
                let message = new Message();
                message.set( { user_id, message: 'has left. Like a bitch.', type: 'status' } );
                message.validate() && message.save();

            }

        } );

        return;
    },
    /**
     * @summary init a login session by creating a document
     * who's gonna hold the connection status in sync between the
     * user and the server
     * @param infos
     * @return {String} user_logging document _id
     */
    'user.init.logging'( infos = {} ) {

        if ( !Meteor.user() )
            throw new Meteor.Error( 'UserNotFound', 'No user connected' );

        const user_id = Meteor.userId();

        const user_logging = new UserLogging();
        user_logging.set( {
            user_id,
            infos
        } );

        if ( !user_logging.validate() )
            throw new Meteor.Error( 'ValidationFailed', 'Validation of user logging doc has failed' );

        Meteor.users.update( user_id, { $set: { 'profile.connection': 'online' } } );

        return user_logging.save();
    },
    /**
     * @summary update the logging, to keep the server
     * in sync with the connection status of the user on
     * x number of devices
     * @param _id
     * @return
     */
    'user.update.logging'( _id ) {

        if ( !Meteor.user() )
            throw new Meteor.Error( 'UserNotFound', 'No user connected' );

        if ( !_id )
            throw new Meteor.Error( '_id-missing', 'No _id has been specified' );

        const user_id = Meteor.userId();
        UsersLogging.update( { user_id, _id }, { $set: { updated_at: new Date() } } );

        return;

    }
} );