/*
 ██████╗ ██╗███╗   ██╗███╗   ██╗███████╗██████╗
 ██╔══██╗██║████╗  ██║████╗  ██║██╔════╝██╔══██╗
 ██████╔╝██║██╔██╗ ██║██╔██╗ ██║█████╗  ██║  ██║
 ██╔═══╝ ██║██║╚██╗██║██║╚██╗██║██╔══╝  ██║  ██║
 ██║     ██║██║ ╚████║██║ ╚████║███████╗██████╔╝
 ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝╚═════╝
 ███╗   ███╗███████╗███████╗███████╗ █████╗  ██████╗ ███████╗███████╗
 ████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝ ██╔════╝██╔════╝
 ██╔████╔██║█████╗  ███████╗███████╗███████║██║  ███╗█████╗  ███████╗
 ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══██║██║   ██║██╔══╝  ╚════██║
 ██║ ╚═╝ ██║███████╗███████║███████║██║  ██║╚██████╔╝███████╗███████║
 ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
 */

/* --- helpers --- */
Template.pinned_message.helpers( {
    /**
     * @summary get the current user data
     * @return {object}
     */
    user() {
        var t = Meteor.users.findOne( this.user_id );
        console.log( t );
        return t;
    },
    /**
     * @summary check if pinned message owner
     * @return {Boolean}
     */
    owner() {
        return this.user_id === Meteor.userId();
    },
    /**
     * @summary parse message for links
     * @return {String}
     */
    parseMessage() {
        return this.message;
    }
} );

/* --- events --- */
Template.pinned_message.events( {
    /**
     * @summary un-pin a message
     */
    'click .remove-pinned'() {
        const pinned = this;

        Meteor.call( 'message.pinned.remove', pinned, ( err ) => {
            if ( err )console.log( err );
        } );
    }
} );