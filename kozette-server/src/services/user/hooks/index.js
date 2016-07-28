'use strict';

const handleRoles = require('./handleRoles');

const hooks = require( 'feathers-hooks' );
const auth = require( 'feathers-authentication' ).hooks;

exports.before = {
    all: [],
    find: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.restrictToAuthenticated()
    ],
    get: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.restrictToAuthenticated()
    ],
    create: [
        auth.hashPassword(), 
        handleRoles()
    ],
    update: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.restrictToAuthenticated(),
        auth.restrictToOwner( { ownerField: '_id' } ),
        hooks.remove( 'roles' )
    ],
    patch: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.restrictToAuthenticated(),
        auth.restrictToOwner( { ownerField: '_id' } ),
        hooks.remove( 'roles' )
    ],
    remove: [
        hooks.disable()
    ]
};

exports.after = {
    all: [ 
        hooks.remove( 'password' ) 
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
};
