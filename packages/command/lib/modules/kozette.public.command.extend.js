let command = {
    /**
     * @summary return if message is a command
     * @param {string} message
     * @return {Boolean}
     */
    isCommand(message) {
        const reg = /^\/(nick|color|me)\s/;
        return reg.test(message);
    },
    /**
     * @summary execute specified command
     * @param  {string} command
     * @return
     */
    executeCommand(command) {
        // for the nick command
        const nickRegEx = /^\/nick\s/;
        if(nickRegEx.test(command)) {
            const nick = command.substring(command.indexOf(' ')+1);
            Meteor.users.update(Meteor.userId() , {$set: {'profile.username': nick}});
            return;
        }
        // for the color command
        const colorRegEx = /^\/color\s/;
        if(colorRegEx.test(command)) {
            const color = command.substring(command.indexOf(' ')+1);
            Meteor.users.update(Meteor.userId() , {$set: {'profile.color': color}});
            return;
        }
        // for the /me command
        const meRegEx = /^\/me\s/;
        if(meRegEx.test(command)) {
            let message = new Message();
            const text = command.substring(command.indexOf(' ')+1);
            message.set({ user_id: Meteor.userId(), message: text, type: 'info' });
            message.validate() && Meteor.call('message.insert', message, (err) => { if(err)console.log(err); } );
            return;
        }
    }
}

_.extend(Kozette.public.command, command);
