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

        // detect if using an included command or
        // just sending a new message
        //
        // for the nick command
        const nickRegEx = /^\/nick\s/;
        if(nickRegEx.test(text)) {
            const nick = text.substring(text.indexOf(' ')+1);
            Meteor.users.update(Meteor.userId() , {$set: {'profile.username': nick}});
            $('form')[0].reset();
            return;
        }
        // for the color command
        const colorRegEx = /^\/color\s/;
        if(colorRegEx.test(text)) {
            const color = text.substring(text.indexOf(' ')+1);
            Meteor.users.update(Meteor.userId() , {$set: {'profile.color': color}});
            $('form')[0].reset();
            return;
        }

        let message = new Message();
        message.set({
            user_id: Meteor.userId(),
            message: text,
            created_at: new Date()
        });
        if(message.validate()) {
            message.save();
            $('form')[0].reset();
        }
    }
});
