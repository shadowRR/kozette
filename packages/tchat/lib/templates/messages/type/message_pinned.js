/**/

/* --- helpers --- */
Template.message_pinned.helpers({
    /**
     * @summary humanize the time
     * @return {string}
     */
    time() {
        return moment(this.created_at).format('D/MM/YYYY - HH:mm');
    },
    /**
     * @summary get the current user data
     * @return {object}
     */
    user() {
        return Meteor.users.findOne(this.user_id);
    },
    /**
     * @summary check if pinned message owner
     * @return {[type]} [description]
     */
    owner() {
        return this.user_id === Meteor.userId();
    }
});

/* --- events --- */
Template.message_pinned.events({
    /**
     * @summary un-pin a message
     */
    'click .button.remove.pinned'() {
        const message_pinned = this;

        Meteor.call('message.pinned.remove', message_pinned, (err) => {
            if(err)console.log(err);
        });
    }
});
