/**/

Template.userslist.helpers({
    users() {
        return Meteor.users.find();
    }
});

Template.userslist.onCreated(function() {
    let self = this

    self.autorun(() => {
        self.subscribe('users.list');
    });
});