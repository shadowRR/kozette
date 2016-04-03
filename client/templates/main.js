/*
 ███╗   ███╗ █████╗ ██╗███╗   ██╗       ██╗        █████╗ ██████╗ ██████╗
 ████╗ ████║██╔══██╗██║████╗  ██║       ██║       ██╔══██╗██╔══██╗██╔══██╗
 ██╔████╔██║███████║██║██╔██╗ ██║    ████████╗    ███████║██████╔╝██████╔╝
 ██║╚██╔╝██║██╔══██║██║██║╚██╗██║    ██╔═██╔═╝    ██╔══██║██╔═══╝ ██╔═══╝
 ██║ ╚═╝ ██║██║  ██║██║██║ ╚████║    ██████║      ██║  ██║██║     ██║
 ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝    ╚═════╝      ╚═╝  ╚═╝╚═╝     ╚═╝     
 */

/* --- main helpers --- */
Template.main.helpers( {
    /**
     * @summary check if there's a user authenticated
     * @returns {boolean}
     */
    authenticated() {
        return !!Meteor.user();
    },
    /**
     * @summary check if we're on the cordova app
     * @returns {boolean}
     */
    isMobile() {
        return Meteor.isCordova;
    }
} );

/* --- app onrendered --- */
Template.web_app.onRendered( function () {

    Split( [ '#content', '#sidebar' ], {
        sizes: [ 85, 15 ],
        minSize: [ 400, 200 ],
        gutterSize: 8,
        cursor: 'col-resize'
    } )

    Split( [ '#nav', '#pinned' ], {
        direction: 'vertical',
        sizes: [ 75, 25 ],
        gutterSize: 8,
        cursor: 'row-resize'
    } )

} );