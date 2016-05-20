'use strict';

module.exports = function () {
    return function ( socket ) {
        socket.on( 'connection', function ( socket ) {
            socket.on( 'disconnect', () => {
                console.log( socket.id );
            } );
        } );
    };
};