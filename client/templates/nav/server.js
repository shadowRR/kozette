/**/

Template.server.helpers({
    /**
     *
     * @returns {MeteorTemplateHelpersNamespace.server.connected|boolean}
     */
    connected() {
        return Meteor.status().connected;
    }
});