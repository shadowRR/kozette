/**/

Template.menu.helpers({
    /**
     * @summary return if muted mode is active
     */
    isMuted() {
        return Session.get('mute');
    }
});