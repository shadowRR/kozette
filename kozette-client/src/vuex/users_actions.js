import { userService } from '../services';

export const fetchUsers = function ( { dispatch } ) {
	// get the list of users from feathers websockets
	userService.find().then( users => {
		dispatch( 'FETCH_USERS', users.data );
	} );
};

export const addUser = function ( { dispatch } ) {
	// a new user was added on server
	userService.on( 'created', user => {
		dispatch( 'ADD_USER', user );
	} );
};

export const updateAndPatchUser = function({dispatch}) {
    // a user was updated or patched on the server
    userService.on('updated', user => {
       dispatch('UPDATE_PATCH_USER', user);
    });
    userService.on('patched', user => {
        dispatch('UPDATE_PATCH_USER', user);
    });
};
