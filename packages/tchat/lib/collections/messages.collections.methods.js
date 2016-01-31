/**/

Meteor.methods({
    /**
     * @summary insert a basic message
     * @param {string} message
     */
    'message.insert'(message) {
        const user_id = Meteor.userId();
        // Allow only a super restricted set of tags and attributes
        const clean = sanitizeHtml(message.message, {
          allowedTags: [ 'a' ],
          allowedAttributes: {
            'a': [ 'href', 'target' ]
          }
        });
        console.log(clean);
        message.set({ user_id, created_at: new Date(), message: clean });
        if(message.validate()){
            message.save();
        }
        return;
    },
    /**
     * @summary insert a message with it's oEmbed link data
     * @param {string} message
     */
    'message.link.insert'(message) {
        const user_id = Meteor.userId();

        const result = HTTP.get('https://api.embedly.com/1/oembed',
            {params: { url: message, key: Meteor.settings.embedly_api_key } });
        if(result.data) {
            message.set({ user_id, created_at: new Date(), embed: result.data });
            if(message.validate()){
                message.save();
            }
        }
        return;
    }
});
