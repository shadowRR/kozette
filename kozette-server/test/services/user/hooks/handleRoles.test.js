'use strict';

const assert = require('assert');
const handleRoles = require('../../../../src/services/user/hooks/handleRoles.js');

describe('user handleRoles hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    handleRoles()(mockHook);

    assert.ok(mockHook.handleRoles);
  });
});
