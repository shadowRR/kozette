'use strict';

const hooks = require( 'feathers-hooks' );
const auth = require( 'feathers-authentication' ).hooks;

exports.before = {
    all: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.restrictToAuthenticated()
    ],
    find: [],
    get: [],
    create: [
        auth.associateCurrentUser( { as: 'user_id' } )
    ],
    update: [
        hooks.disable()
    ],
    patch: [
        auth.restrictToOwner( { ownerField: 'user_id' } ),
        // only permit changing the pinned value
        hooks.pluck( 'pinned' )
    ],
    remove: [
        hooks.disable()
    ]
};

exports.after = {
    all: [
        hooks.populate( 'user', { service: 'users', field: 'user_id' } )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
};
