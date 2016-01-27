/**/

/* --- helpers --- */
Template.message_basic.helpers({
    /**
     * @summary humanize the time
     * @return {string}
     */
    time() {
        return moment(this.message.created_at).format('D/MM/YYYY - HH:mm');
    },
    /**
     * @summary get the current user data
     * @return {object}
     */
    user() {
        return Meteor.users.findOne(this.user_id);
    }
});
