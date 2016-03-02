/**/

Template.main.helpers({
    authenticated() {
        return !!Meteor.user();
    }
});