/**/

Template.userslist.helpers({
    users() {
        return Meteor.users.find({'profile.connection': 'online'});
    }
});

Template.userslist.onCreated(function() {
    let self = this

    self.autorun(() => {
        self.subscribe('users.list');
    });
});