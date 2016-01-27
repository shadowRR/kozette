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

        const text = $('[name=message]').val() || null;

        if(Kozette.public.command.isCommand(text)) {
            Kozette.public.command.executeCommand(text);
            $('form')[0].reset();
        }else {
            let message = new Message();
            message.set({
                user_id: Meteor.userId(),
                message: text,
                type: 'basic'
            });
            if(message.validate()) {
                message.save();
                $('form')[0].reset();
            }
        }

    }
});
