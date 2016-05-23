'use strict';

/**
 * @summary trigger $addToSet on mongoose model if specified by the request
 * @param options
 * @returns {Function}
 */
module.exports = function ( options ) {
    return function ( hook ) {

        if ( hook.type !== 'before' ) {
            throw new Error( `The 'aggregate' hook should only be used as a 'before' hook.` );
        }

        if ( hook.method !== 'patch' ) {
            throw new Error( `The '$addToSet' hook should only be used with the patch method.` );
        }

        if ( hook.data.$addToSet ) {

            if ( !options.service ) {
                throw new Error( `The $addToSet hook require a service to execute` );
            }

            let Model = hook.app.service( options.service ).Model;
            return new Promise( ( resolve, reject ) => {
                Model.update( { _id: hook.id }, hook.data ).exec( ( err, result ) => {
                    if ( err ) return reject( error );
                    hook.result = result;
                    resolve( hook );
                } );
            } );
        }

    };
};