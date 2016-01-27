let command = {
    /**
     * @summary return if message is a command
     * @param {string} message
     * @return {Boolean}
     */
    isCommand(message) {
        const reg = /^\/(nick|color)\s/;
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
    }
}

_.extend(Kozette.public.command, command);
