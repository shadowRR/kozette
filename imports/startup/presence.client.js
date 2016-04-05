/*
 ██████╗ ██████╗ ███████╗███████╗███████╗███╗   ██╗ ██████╗███████╗
 ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝████╗  ██║██╔════╝██╔════╝
 ██████╔╝██████╔╝█████╗  ███████╗█████╗  ██╔██╗ ██║██║     █████╗
 ██╔═══╝ ██╔══██╗██╔══╝  ╚════██║██╔══╝  ██║╚██╗██║██║     ██╔══╝
 ██║     ██║  ██║███████╗███████║███████╗██║ ╚████║╚██████╗███████╗
 ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝
 ██████╗██╗     ██╗███████╗███╗   ██╗████████╗
 ██╔════╝██║     ██║██╔════╝████╗  ██║╚══██╔══╝
 ██║     ██║     ██║█████╗  ██╔██╗ ██║   ██║
 ██║     ██║     ██║██╔══╝  ██║╚██╗██║   ██║
 ╚██████╗███████╗██║███████╗██║ ╚████║   ██║
 ╚═════╝╚══════╝╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝
 */

import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

Meteor.startup( function () {

    Accounts.onLogin( function () {

        // init the logging for the new connexion
        // and subscribe to the new doc just added
        Meteor.call( 'user.init.logging', ( err, res ) => {
            if ( err )
                return console.log( err );

            Meteor.subscribe( 'users.logging.single', res );

        } );

    } );

    // let sound = new Audio( 'sounds/kozette_connection.mp3' );
    // sound.play();

} );
