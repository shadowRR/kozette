/**/

Template.mobile_userslist.onCreated( function () {
    let self = this;

    self.autorun( function () {
        self.subscribe('users.list');
    } );
} );