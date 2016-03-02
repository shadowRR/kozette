/**/

Meteor.methods({
    'message.pinned.insert'(message_pinned) {
        const user_id = Meteor.userId();
        message_pinned.set({ user_id, created_at: new Date() });
        if(message_pinned.validate()){
            message_pinned.save();
        }
        return;
    },
    /**
     * @summary un-pin a message
     * @param  {object} message_pinned
     */
    'message.pinned.remove'(message_pinned) {
        if(message_pinned.user_id == Meteor.userId()) {
            message_pinned.remove();
        }
    }
});
