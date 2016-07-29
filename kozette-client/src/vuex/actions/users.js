'use strict';

import { userService } from '../../services';
import * as types from '../mutation-types';

'use strict';

export const loginCurrentUser = function ( { dispatch }, user ) {
    // persist in state the currently logged in user
    dispatch( types.LOGIN_USER, user );
};

export const logoutCurrentUser = function ( { dispatch } ) {
    // remove the logged user data, which then permit the
    // interface to revert to the login page
    dispatch( types.LOGOUT_USER );
};

export const fetchUsers = function ( { dispatch } ) {
	// get the list of users from feathers websockets
	userService.find().then( users => dispatch( types.FETCH_USERS, users.data ) );
};

export const addUser = function ( { dispatch } ) {
	// a new user was added on server
	userService.on( 'created', user => dispatch( types.ADD_USER, user ) );
};

export const updateAndPatchUser = function( { dispatch } ) {
    // a user was updated or patched on the server
    userService.on( 'updated', user => dispatch( types.UPDATE_PATCH_USER, user ) );
    userService.on( 'patched', user => dispatch( types.UPDATE_PATCH_USER, user ) );
};
