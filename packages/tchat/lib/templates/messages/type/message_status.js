/**/

/* --- helpers --- */
Template.message_status.helpers({
    /**
     * @summary prepare text
     * @return {[type]} [description]
     */
    text() {
        const user = Meteor.users.findOne(this.user_id);
        return `${user.profile.username} ${this.message}`;
    }
});
