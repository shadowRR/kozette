/**/

Template.registerHelper( 'getDate', function ( date ) {
    return date && moment( date ).format( 'DD/MM/YYYY - HH:mm' );
} );

Template.registerHelper( 'getUser', function ( user_id ) {
    return user_id && Meteor.users.findOne( user_id );
} );