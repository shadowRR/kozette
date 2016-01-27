Meteor.startup(function() {
    // client side
    if(Meteor.isClient) {
        // Start monitor for user activity
        UserPresence.start();
    }

    // server side
    if(Meteor.isServer) {
        // Start monitor for user activity
        UserPresence.start();
        UserPresenceMonitor.start();
    }
});
