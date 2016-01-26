// publish the list of message to a connected
// user only
Meteor.publish("messages.list", function() {
    if (this.userId) {
        return Messages.find({}, {
            limit: 20,
            sort: {
                created_at: -1
            }
        });
    }
});

// publish the list of users to a connected
// user - the list contains logged in and
// logged out users
Meteor.publish("users.list", function(){
    if(this.userId) {
        return Meteor.users.find();
    }
});
