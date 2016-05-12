'use strict';

import {feathers_socket, userService} from '../services';

/**
 * @summary update the status of the
 * current user every minutes so the server
 * knows when a user is online or not
 * @param _id
 * @return
 */
export const userStatusInterval = ( _id ) => {

    // patch user online status and
    const patchUser = () => {
        // online try to patch if connected
        // to server
        if ( feathers_socket.io.connected )
            userService.patch(
                _id,
                { 'status.online': true, 'status.lastSeen': new Date() },
                ( err ) => {
                    if ( err ) console.error( err );
                } );
    };
    
    // execute the first time in init since
    // loading this function means the user
    // just connected
    patchUser();

    // set the interval every minutes
    return setInterval( () => patchUser(), 1000 * 60 );

};