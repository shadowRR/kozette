'use strict';

const assert = require( 'chai' ).assert;
const handleRoles = require( '../../../../src/services/user/hooks/handleRoles.js' );

describe( 'user handleRoles hook' , function() {

    it.skip( 'hook can be used' , function() {
        const mockHook = {
            type: 'before',
            app: {},
            params: {},
            result: {},
            data: {}
        };

        handleRoles()( mockHook );

        assert.ok( mockHook.handleRoles );
    } );

} );
