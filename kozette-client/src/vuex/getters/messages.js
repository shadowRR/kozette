'use strict';

/**
 * @summary get messages list
 * @param state
 * @return
 */
export const getMessagesList = state => state.messages.messages;

/**
 * @summary get pinned messages list
 * @param state
 * @return
 */
export const getPinnedMessageList = state => state.messages.pinned_messages;
