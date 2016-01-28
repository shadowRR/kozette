let command = {
    /**
     * @summary return if message is a command
     * @param {string} message
     * @return {Boolean}
     */
    isCommand(message) {
        const reg = /^\/(nick|color|me|status)\b/;
        return reg.test(message);
    },
    /**
     * @summary execute specified command
     * @param  {string} command
     * @return
     */
    executeCommand(command) {
        // for the nick command
        const nickRegEx = /^\/nick\b/;
        if(nickRegEx.test(command)) {
            const nick = command.substring(command.indexOf(' ')+1);
            Meteor.users.update(Meteor.userId() , {$set: {'profile.username': nick}});
            return;
        }
        // for the color command
        const colorRegEx = /^\/color\b/;
        if(colorRegEx.test(command)) {
            const color = command.substring(command.indexOf(' ')+1);
            Meteor.users.update(Meteor.userId() , {$set: {'profile.color': color}});
            return;
        }
        // for the /me command
        const meRegEx = /^\/me\b/;
        if(meRegEx.test(command)) {
            let message = new Message();
            const text = command.substring(command.indexOf(' ')+1);
            message.set({ user_id: Meteor.userId(), message: text, type: 'info' });
            message.validate() && Meteor.call('message.insert', message, (err) => { if(err)console.log(err); } );
            return;
        }
        // for the /status command
        const statusRegEx = /^\/status\b/;
        if(statusRegEx.test(command)) {
            let text = '';
            if(command.indexOf(' ') > -1) text = command.substring(command.indexOf(' ')+1);
            Meteor.users.update(Meteor.userId(), {$set: {'profile.status': text}});
            return;
        }
    }
}

_.extend(Kozette.public.command, command);
