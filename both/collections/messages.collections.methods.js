/**/

Meteor.methods( {
    /**
     * @summary insert a basic message
     * @param {string} message
     */
    'message.insert' ( message ) {
        const user_id = Meteor.userId();
        let clean;
        // Allow only a super restricted set of tags and attributes
        if ( Meteor.isServer ) {
            clean = sanitizeHtml( message.message, {
                allowedTags: [ 'a' ],
                allowedAttributes: {
                    'a': [ 'href', 'target' ]
                },
                transformTags: {
                    'a': sanitizeHtml.simpleTransform( 'a', {
                        target: '_blank'
                    } ),
                }
            } );
            message.set( { created_at: new Date() } );
        } else {
            message.set( { created_at: new Date(Date.now() + TimeSync.serverOffset()) } );
        }

        message.set( {
            user_id, message: clean || message.message
        } );
        if ( message.validate() ) {
            message.save();
        }
        return;
    }
} );
