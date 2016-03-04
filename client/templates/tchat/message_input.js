/**/

Template.message_input.events( {
    'keypress input[name=message]'( e ) {
        if ( e.keyCode == 13 ) {
            const text = $( '[name=message]' ).val() || null;

            if ( Kozette.public.command.isCommand( text ) ) {
                Kozette.public.command.executeCommand( text );
                $( '[name=message]' ).val( '' );
            } else {
                let message = new Message();
                message.set( {
                    user_id: Meteor.userId(),
                    message: text,
                    type: 'basic'
                } );
                if ( message.validate() ) {
                    Meteor.call( 'message.insert', message, ( err ) => {
                        if ( err )console.log( err );
                    } );
                    $( '[name=message]' ).val( '' );
                }
            }
        }
    }
} );