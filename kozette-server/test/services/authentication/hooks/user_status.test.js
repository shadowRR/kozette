'use strict';

const assert = require('assert');
const userStatus = require('../../../../src/services/authentication/hooks/user_status.js');

describe('authentication userStatus hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    userStatus()(mockHook);

    assert.ok(mockHook.userStatus);
  });
});
