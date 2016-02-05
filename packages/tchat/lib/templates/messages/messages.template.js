/* MESSAGES */

/* --- helpers --- */
Template.messages.helpers({
    /**
     * @summary check if pinned messages
     * are available
     * @return {boolean}
     */
    pinned() {
        return MessagesPinned.find().count() > 0;
    },
    /**
     * @summary get list of messages
     * @return {cursor}
     */
    messages() {
        // prepare the sound to trigger
        // when receiving a new message
        let sound = new buzz.sound('/kozette_message.mp3');
        let query = Messages.find({}, {sort: {created_at: 1}});
        query.observe({
            added(doc) {
                // if new message not from the connected
                // user and of type 'basic',
                //  trigger the new message sound
                if(Meteor.userId() != doc.user_id && doc.type === 'basic')
                    // if mute mode isn't active
                    if(!Session.get('mute'))
                        sound.play();
            }
        })
        return query;
    },
    /**
     * @summary return list of pinned
     * messages
     * @return {cursor}
     */
    pinnedMessages() {
        return MessagesPinned.find({}, {sort: {created_at: 1}});
    },
    /**
     * @summary get the type of message
     * to select the proper template
     * @return {string}
     */
    type() {
        return `message_${this.type}`;
    }
});

/* --- oncreated --- */
Template.messages.onCreated(function() {
    var self = this;

    self.autorun(function() {
        self.subscribe('messages.list');
        self.subscribe('messages.pinned.list');
    });
});
