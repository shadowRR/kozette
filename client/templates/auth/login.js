/**/

Template.login.events({
    'click .blue-link'( e ) {
        e.preventDefault();
        const email = $( '#username' ).val();
        const password = $( '#password' ).val();
        Meteor.loginWithPassword( email, password , (err) => { if(err)console.log(err); } );
    },
    'click .green-link'( e ) {
        e.preventDefault();
        const username = $( '#username' ).val();
        const password = $( '#password' ).val();
        Accounts.createUser( { username, password }, (err) => { if(err)console.log(err); } );
    }
});