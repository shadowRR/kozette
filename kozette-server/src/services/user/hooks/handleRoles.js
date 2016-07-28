'use strict';

module.exports = function() {

	return function( hook ) {
	    
		const userModel = hook.app.service( '/users' ).Model;

		// if there's no user yet, then the first user
		// to be created has the admin roles
		userModel.count().then( count => {
			hook.data.roles = count == 0 ? 'admin' : 'user';
		} );

		return hook;

	};

};
