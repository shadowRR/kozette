'use strict';

const errors = require( 'feathers-errors' );
const moment = require( 'moment' );

/**
 * @summary check every two minutes users who
 * haven't been checking in with the server for
 * more than two minutes
 */
module.exports = function () {
    const app = this;

    setInterval( () => {

        // get the users service
        const users = app.service( '/users' );

        // get a datetime situated two minutes before now
        const two_min_before = moment().subtract( 2, 'minutes' ).toDate();

        // build the query
        users.find( { query: { 'status.online': true, 'status.lastSeen': { $lt: two_min_before }, $limit: 25 } } )
            .then( result => {
                // update each found user has offline
                result.data.forEach( user => {
                    users.patch( user._id, { 'status.online': false } )
                        .catch( err => errors.BadRequest( err ) );
            } );
        } );

    }, 1000 * 60 * 2 );

};