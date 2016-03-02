Meteor.methods({
    /**
     * @summary set a new username
     * @param nick
     */
    'user.set.username'(nick) {
        if(Meteor.isServer) {
            Accounts.setUsername(Meteor.userId(), nick);
        }
        return;
    }
});