Meteor.startup(function() {
    // client side
    if(Meteor.isClient) {
        // Start monitor for user activity
        UserPresence.awayTime = (6000 * 100);
        UserPresence.start();
    }

    // server side
    if(Meteor.isServer) {
        // Start monitor for user activity
        UserPresence.start();
        UserPresenceMonitor.start();

        // Users
        let users = Meteor.users.find();
        users.observeChanges({
            changed(id, doc) {
                console.log(doc, id);
                if(doc.status) {
                    let message = new Message();
                    // get color of the message
                    let color;
                    switch (doc.status) {
                        case 'online':
                            color = 'green';
                            break;
                        case 'offline':
                            color = 'red'
                            break;
                        default:
                            color = 'blue';
                    }
                    message.set({
                        user_id: id,
                        message: `status changed to ${doc.status}`,
                        type: 'status',
                        color
                    });
                    message.validate() && message.save();
                }
            }
        });
    }
});
