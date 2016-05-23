'use strict';

/**
 * @summary trigger $pull on mongoose model if specified by the request
 * @param options
 * @returns {Function}
 */
module.exports = function ( options ) {
    return function ( hook ) {

        console.log( hook );

        if ( hook.type !== 'before' ) {
            throw new Error( `The 'aggregate' hook should only be used as a 'before' hook.` );
        }

        if ( hook.method !== 'patch' ) {
            throw new Error( `The '$pull' hook should only be used with the patch method.` );
        }

        if ( hook.data.$pull ) {

            console.log( 'pull' );

            if ( !options.service ) {
                throw new Error( `The $pull hook require a service to execute` );
            }

            let Model = hook.app.service( options.service ).Model;
            return new Promise( ( resolve, reject ) => {
                Model.update( { _id: hook.id }, hook.data ).exec( ( err, result ) => {
                    if ( err ) return reject( error );
                    console.log( result );
                    hook.result = result;
                    resolve( hook );
                } );
            } );
        }

    };
};