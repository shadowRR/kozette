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
import {HTTP} from 'meteor/http';

const linkify = require( 'linkifyjs' );

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

        // server side, let's start finding, parsing, and embedding links
        if ( Meteor.isServer ) {

            // find links
            const links = linkify.find( message.message );

            // for each found links, get the data
            links.forEach( link => {

                const { type, href, value } = link;

                // if the link is of url type only
                if ( type === 'url' ) {

                    let error, data, result;

                    try {
                        result = HTTP.get( 'https://api.embedly.com/1/oembed', {
                            params: {
                                url: href,
                                key: process.env.OEMBED_API_KEY,
                                maxwidth: 480,
                                origin: 'kozette'
                            }
                        } );
                    }
                    catch (ex) {
                        error = ex.response && ex.response.statusCode || ex.message;
                    }

                    // catch embed.ly errors if any
                    error = (result && result.data && result.data.error) || (result && result.statusCode !== 200 && result.statusCode) || error;
                    data = result && result.data;

                    message.links.push( { value, error, data } ) && message.save();

                }
            } );
        }

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
    }
} );
