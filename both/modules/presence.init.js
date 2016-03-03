Presence = {
    /**
     * @summary insert a presence message when
     * loggin in or out
     * @param  {string} user_id
     * @param  {string} color [Hexa Code]
     * @param  {string} text
     */
    insertPresenceMessage(user_id, color, text) {
        let message = new Message();
        message.set({
            user_id,
            message: text,
            type: 'status',
            color
        });
        message.validate() && message.save();

    }
}

Meteor.startup(function() {

    // on client, init the hooks then
    // trigger sounds on users logging in
    // or out
    if (Meteor.isClient) {
        Hooks.init({
            treatCloseAsLogout: true
        });

        Hooks.onLoggedIn = (user_id) => {
            let sound = new buzz.sound('/kozette_connection.mp3');
            sound.play();
        }

        Hooks.onLoggedOut = (user_id) => {
            let sound = new buzz.sound('/kozette_disconnection.mp3');
            sound.play();
        }
    }

    // on the server, insert a special message
    // to show users logging in or out
    if (Meteor.isServer) {

        Hooks.onLoggedIn = (user_id) => {
            Meteor.users.update(user_id, {$set: {'profile.connection': 'online'}});
            Presence.insertPresenceMessage(user_id, '#2ecc71', 'is online. And nobody cares.');
        }

        Hooks.onLoggedOut = (user_id) => {
            Meteor.users.update(user_id, {$set: {'profile.connection': 'offline'}});
            Presence.insertPresenceMessage(user_id, '#e74c3c', 'has left. Like a bitch.');
        }
    }

});
