let command = {
    /**
     * @summary return if message is a command
     * @param {string} message
     * @return {Boolean}
     */
    isCommand(message) {
        const reg = /^\/(nick|color|me|status|pin|help|mute)\b/;
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
            Meteor.call('user.set.username', nick);
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
        // for the /pin command
        const pinRegEx = /^\/pin\b/;
        if(pinRegEx.test(command)) {
            let text = command.substring(command.indexOf(' ')+1);
            // base message
            let message = new Message();
            message.set({ user_id: Meteor.userId(), message: text, type: 'basic' });
            message.validate() && Meteor.call('message.insert', message, (err) => { if(err)console.log(err); });
            // pinned message
            let message_pinned = new MessagePinned();
            message_pinned.set({ user_id: Meteor.userId(), message: text });
            message_pinned.validate() && Meteor.call('message.pinned.insert', message_pinned, (err) => { if(err)console.log(err); });
            return;
        }
        // for the help command
        const helpRegEx = /^\/help\b/;
        if(helpRegEx.test(command)) {
            //$('.ui.modal.help').modal('show');
            return;
        }
        // for the mute/unmute command
        const muteRegEx = /^\/mute\b/;
        if(muteRegEx.test(command)) {
            const mute_value = Session.get('mute');
            Session.set('mute', !mute_value);
            // check if duration was specified
            const duration = +command.substring(command.indexOf(' ')+1);
            if(duration && _.isNumber(duration)){
                Meteor.setTimeout(function(mute_value) {
                    Session.set('mute', mute_value);
                }, 1000 * 60 * duration);
            }
        }
    }
}

Kozette.public.command = {};
_.extend(Kozette.public.command, command);
