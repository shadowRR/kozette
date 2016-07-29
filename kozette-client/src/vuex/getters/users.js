'use strict';

/**
 * @summary get the current user if exist
 * @param state
 */
export const currentUser = state => state.users.currentUser;

/**
 * @summary get the list of users from the 
 * state object in vuex
 * @param  state
 * @return {Array}
 */
export const getUsersList = state => state.users.users;
