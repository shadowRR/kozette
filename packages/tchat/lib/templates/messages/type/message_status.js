/**/

/* --- helpers --- */
Template.message_status.helpers({
    /**
     * @summary get the current user data
     * @return {object}
     */
    user() {
        return Meteor.users.findOne(this.user_id);
    },
    /**
     * @summary prepare text
     * @return {[type]} [description]
     */
    text() {
        return `${this.user.profile.username} ${this.message}`;
    },
    /**
     * @summary humanize the time
     * @return {string}
     */
    time() {
        return moment(this.created_at).format('D/MM/YYYY - HH:mm');
    }
});
