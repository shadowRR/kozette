/*
 ███╗   ███╗███████╗███████╗███████╗ █████╗  ██████╗ ███████╗███████╗
 ████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝ ██╔════╝██╔════╝
 ██╔████╔██║█████╗  ███████╗███████╗███████║██║  ███╗█████╗  ███████╗
 ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══██║██║   ██║██╔══╝  ╚════██║
 ██║ ╚═╝ ██║███████╗███████║███████║██║  ██║╚██████╔╝███████╗███████║
 ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
 ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
 ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
 ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
 ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
 ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
 ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
 */

import {Meteor} from 'meteor/meteor';
import {TimeSync} from 'meteor/mizzao:timesync';

Meteor.methods( {
    /**
     * @summary insert a basic message
     * @param {Object} message
     * @return
     */
    'message.insert' ( message ) {

        if ( !Meteor.user() )
            throw new Meteor.Error( 'UserNotFound', 'No user connected' );

        const user_id = Meteor.userId();
        // get the proper time, with tchat offset if needed
        // prevent message to be saved the first time client side
        // with the wrong time
        Meteor.isServer ?
            message.set( { created_at: new Date() } ) :
            message.set( { created_at: new Date( Date.now() + TimeSync.serverOffset() ) } );

        message.set( { user_id, message: message.message } );
        if ( !message.validate() )
            throw new Meteor.Error( 'ValidationFailed', 'Message validation has failed' );

        message.save();

        // Push.debug = true;
        //
        // Push.send({
        //     from: 'push',
        //     title: Meteor.user().username || 'Unknown',
        //     text: message.message,
        //     query: {}
        // });

        return;
    },
    'message.get.embed'( url ) {

        if ( !Meteor.user() )
            throw new Meteor.Error( 'UserNotFound', 'No user connected' );

        const user_id = Meteor.userId();
        
    }
} );
