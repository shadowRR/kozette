/**/

Meteor.methods({
    /**
     * @summary insert a basic message
     * @param {string} message
     */
    'message.insert' (message) {
        const user_id = Meteor.userId();
        let clean;
        // Allow only a super restricted set of tags and attributes
        if(Meteor.isServer) {
            clean = sanitizeHtml(message.message, {
                allowedTags: ['a'],
                allowedAttributes: {
                    'a': ['href', 'target']
                },
                transformTags: {
                    'a': sanitizeHtml.simpleTransform('a', {
                        target: '_blank'
                    }),
                }
            });
        }

        message.set({
            user_id, created_at: new Date(), message: clean || message
        });
        if (message.validate()) {
            message.save();
        }
        return;
    }
});
