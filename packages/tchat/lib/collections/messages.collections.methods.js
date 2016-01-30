/**/

Meteor.methods({
    'message.insert'(message) {
        const user_id = Meteor.userId();
        message.set({ user_id, created_at: new Date() });
        if(message.validate()){
            message.save();
        }
        return;
    }
});
