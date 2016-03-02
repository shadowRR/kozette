/**/

Template.account.events( {
    'click .red-link'( e ) {
        Meteor.logout();
    }
} );