export const loginCurrentUser = function ( { dispatch }, user ) {
    // persist in state the currently logged in user
    dispatch( 'LOGIN_USER', user );
};

export const logoutCurrentUser = function ( { dispatch } ) {
    // remove the logged user data, which then permit the
    // interface to revert to the login page
    dispatch( 'LOGOUT_USER' );
};