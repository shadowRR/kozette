/**/

Template.registerHelper( 'getDate', function ( date ) {
    return date && moment( date ).format( 'DD/MM/YYYY - HH:mm' );
} );

Template.registerHelper( 'getTime', function ( date ) {
    return date && moment( date ).format( 'HH:mm' );
} );

Template.registerHelper( 'getDateFromNow', function ( date ) {
    return date && moment( date ).fromNow();
} );

Template.registerHelper( 'getUser', function ( user_id ) {
    return user_id && Meteor.users.findOne( user_id );
} );