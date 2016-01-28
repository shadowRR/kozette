/* USERS */

/* --- helpers --- */
Template.users.helpers({
    /**
     * @summary get listing of online users
     * @return {cursor}
     */
    online: function() {
        return Meteor.users.find({'profile.connection': {$not: 'offline'} });;
    },
    /**
     * @summary get list of offline users
     * @return {cursor}
     */
    offline() {
        return Meteor.users.find({'profile.connection': 'offline'});
    }
});

/* --- oncreated --- */
Template.users.onCreated(function() {
    let self = this;

    self.autorun(function() {
        self.subscribe('users.list');
    });
});
