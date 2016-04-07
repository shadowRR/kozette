/*
 ███╗   ███╗ █████╗ ██╗███╗   ██╗       ██╗        █████╗ ██████╗ ██████╗
 ████╗ ████║██╔══██╗██║████╗  ██║       ██║       ██╔══██╗██╔══██╗██╔══██╗
 ██╔████╔██║███████║██║██╔██╗ ██║    ████████╗    ███████║██████╔╝██████╔╝
 ██║╚██╔╝██║██╔══██║██║██║╚██╗██║    ██╔═██╔═╝    ██╔══██║██╔═══╝ ██╔═══╝
 ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║    ██████║      ██║  ██║██║     ██║
 ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝    ╚═════╝      ╚═╝  ╚═╝╚═╝     ╚═╝     
 */

import './main.html';

import {Meteor} from 'meteor/meteor';
import {Split} from '../../lib/split.min.js';
import Favico from '../../lib/favico.min.js';

import './web/auth/login';
import './web/tchat/tchat';
import './web/tchat/message_input';

import './web/nav/web_pinned_message';
import './web/nav/web_account';
import './web/nav/web_nav';
import './web/nav/web_pinned';
import './web/nav/web_server';
import './web/nav/web_userslist';

import './mobile/nav/mobile_userslist';

/* --- main helpers --- */
Template.main.helpers( {
    /**
     * @summary check if there's a user authenticated
     * @returns {boolean}
     */
    authenticated() {
        return !!Meteor.user();
    },
    /**
     * @summary check if we're on the cordova app
     * @returns {boolean}
     */
    isMobile() {
        return Meteor.isCordova;
    }
} );

/* --- oncreated --- */
Template.web_app.onCreated( function () {
    let self = this;

    // init the favicon notifications
    let favicon = new Favico( { animation: 'none' } );

    self.autorun( function () {
        favicon.badge( Session.get( 'favicon_notif' ) );
    } );

} );

/* --- app onrendered --- */
Template.web_app.onRendered( function () {

    Split( [ '#content', '#sidebar' ], {
        sizes: [ 85, 15 ],
        minSize: [ 400, 200 ],
        gutterSize: 8,
        cursor: 'col-resize'
    } );

    Split( [ '#nav', '#pinned' ], {
        direction: 'vertical',
        sizes: [ 75, 25 ],
        gutterSize: 8,
        cursor: 'row-resize'
    } );

} );