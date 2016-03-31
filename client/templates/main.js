/**/

Template.main.helpers( {
    authenticated() {
        return !!Meteor.user();
    }
} );

Template.app.onRendered( function () {
    Split( [ '#content', '#sidebar' ], {
        sizes: [ 75, 25 ],
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