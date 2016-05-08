'use strict';

const myDebugHook = function ( hook ) {
    console.log( hook );
};

exports.before = {
    all: [ myDebugHook ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
};

exports.after = {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
};