/*
 ██╗    ██╗███████╗██████╗     ██████╗ ██╗███╗   ██╗███╗   ██╗███████╗██████╗
 ██║    ██║██╔════╝██╔══██╗    ██╔══██╗██║████╗  ██║████╗  ██║██╔════╝██╔══██╗
 ██║ █╗ ██║█████╗  ██████╔╝    ██████╔╝██║██╔██╗ ██║██╔██╗ ██║█████╗  ██║  ██║
 ██║███╗██║██╔══╝  ██╔══██╗    ██╔═══╝ ██║██║╚██╗██║██║╚██╗██║██╔══╝  ██║  ██║
 ╚███╔███╔╝███████╗██████╔╝    ██║     ██║██║ ╚████║██║ ╚████║███████╗██████╔╝
 ╚══╝╚══╝ ╚══════╝╚═════╝     ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝╚═════╝ 
 */

import './web_pinned.html';

import {Template} from 'meteor/templating';
import {MessagesPinned} from '../../../../api/messages_pinned/messages_pinned.collections.js';

/* --- helpers --- */
Template.web_pinned.helpers({
     /**
      * @summary humanize the time
      * @return {string}
      */
    messages() {
        let query = MessagesPinned.find( {}, { sort: { created_at: 'desc' } } );
        return query;
    }
 });