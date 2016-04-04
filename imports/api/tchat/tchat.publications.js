/*
 ████████╗ ██████╗██╗  ██╗ █████╗ ████████╗
 ╚══██╔══╝██╔════╝██║  ██║██╔══██╗╚══██╔══╝
 ██║   ██║     ███████║███████║   ██║
 ██║   ██║     ██╔══██║██╔══██║   ██║
 ██║   ╚██████╗██║  ██║██║  ██║   ██║
 ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 ██████╗ ██╗   ██╗██████╗ ██╗     ██╗ ██████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
 ██╔══██╗██║   ██║██╔══██╗██║     ██║██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
 ██████╔╝██║   ██║██████╔╝██║     ██║██║     ███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗
 ██╔═══╝ ██║   ██║██╔══██╗██║     ██║██║     ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║
 ██║     ╚██████╔╝██████╔╝███████╗██║╚██████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║
 ╚═╝      ╚═════╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
 */

import {Meteor} from 'meteor/meteor';
import {Messages} from '../messages/messages.collections.js';
import {MessagesPinned} from '../messages_pinned/messages_pinned.collections.js';

Meteor.publish( "messages.list", function () {

    if ( !this.userId )
        throw new Meteor.Error( 'no-user-id', 'There is no user connected' );

    const selector = {},
        options = { limit: 50, sort: { created_at: -1 } };

    return Messages.find( selector, options );

} );

Meteor.publish( "messages.pinned.list", function () {

    if ( !this.userId )
        throw new Meteor.Error( 'no-user-id', 'There is no user connected' );

    return MessagesPinned.find();

} );

Meteor.publish( "users.list", function () {

    if ( !this.userId )
        throw new Meteor.Error( 'no-user-id', 'There is no user connected' );

    return Meteor.users.find();

} );
