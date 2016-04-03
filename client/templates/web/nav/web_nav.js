/*
 ███╗   ██╗ █████╗ ██╗   ██╗
 ████╗  ██║██╔══██╗██║   ██║
 ██╔██╗ ██║███████║██║   ██║
 ██║╚██╗██║██╔══██║╚██╗ ██╔╝
 ██║ ╚████║██║  ██║ ╚████╔╝ 
 ╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═══╝  
 */

Template.web_nav.helpers({
    /**
     * @summary get the actual mute value
     * @returns {String}
     */
    mute() {
        return Session.get('mute') ? 
            'logo/kozette_large_nosound.png' :
            'logo/kozette_large_transparent.png';
    }
});