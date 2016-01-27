/**/

/* --- helpers --- */
Template.message_info.helpers({
    /**
     * @summary format text info
     * @return {string}
     */
    text() {
        const user = Meteor.users.findOne(this.user_id);
        return `${user.profile.username} ${this.message}`;
    }
});
