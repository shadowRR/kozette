/* SEND */

/* --- helpers --- */
Template.send.helpers({
    /**
     * @summary check is user is logged in
     * @return {boolean}
     */
    loggedIn: function() {
        return !!Meteor.userId();
    }
});

/* --- events --- */
Template.send.events({
    /**
     * @summary submit new message
     * @param e
     */
    'submit form': function(e) {
        e.preventDefault();

        let message = new Message();
        message.set({
            user_id: Meteor.userId(),
            message: $('[name=message]').val() || null,
            created_at: new Date()
        });
        if(message.validate()) {
            message.save();
            $('form')[0].reset();
        }
    }
});
