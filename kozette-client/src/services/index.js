'use strict';

import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import auth from 'feathers-authentication/client';
import io from 'socket.io-client';
import config from '../config';

// connect to feathersJS server
const socket = io( config.SERVER_URL );

export const feathers_socket = feathers()
    .configure( socketio( socket ) )
    .configure( hooks() )
    .configure( auth( { storage: window.localStorage } ) );

// services
export const userService = feathers_socket.service( 'users' );
export const messageService = feathers_socket.service( 'messages' );
