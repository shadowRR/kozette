/*
 ██╗   ██╗███████╗███████╗██████╗ ███████╗    ██╗      ██████╗  ██████╗  ██████╗ ██╗███╗   ██╗ ██████╗
 ██║   ██║██╔════╝██╔════╝██╔══██╗██╔════╝    ██║     ██╔═══██╗██╔════╝ ██╔════╝ ██║████╗  ██║██╔════╝
 ██║   ██║███████╗█████╗  ██████╔╝███████╗    ██║     ██║   ██║██║  ███╗██║  ███╗██║██╔██╗ ██║██║  ███╗
 ██║   ██║╚════██║██╔══╝  ██╔══██╗╚════██║    ██║     ██║   ██║██║   ██║██║   ██║██║██║╚██╗██║██║   ██║
 ╚██████╔╝███████║███████╗██║  ██║███████║    ███████╗╚██████╔╝╚██████╔╝╚██████╔╝██║██║ ╚████║╚██████╔╝
 ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝    ╚══════╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
 ██████╗ ██████╗ ██╗     ██╗     ███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
 ██╔════╝██╔═══██╗██║     ██║     ██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
 ██║     ██║   ██║██║     ██║     █████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
 ██║     ██║   ██║██║     ██║     ██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
 ╚██████╗╚██████╔╝███████╗███████╗███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
 ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
 */

import {Mongo} from 'meteor/mongo';
import {Astro} from 'meteor/jagi:astronomy';
import {Validators} from 'meteor/jagi:astronomy-validators';

export const UsersLogging = new Mongo.Collection( 'users_logging' );

export const UserLogging = Astro.Class( {
    name: 'UserLogging',
    collection: UsersLogging,
    fields: {
        user_id: {
            type: 'string',
            immutable: true,
            validator: [
                Validators.required(),
                Validators.string()
            ]
        },
        infos: {
            type: 'object',
            default() {
                return {};
            }
        }
    },
    behaviors: {
        timestamp: {
            createdFieldName: 'created_at',
            updatedFieldName: 'updated_at',
        }
    },
    indexes: {
        user: {
            fields: {
                user_id: 1,
                _id: 1
            }
        },
        date: {
            fields: {
                user_id: 1,
                updated_at: -1
            }
        }
    }
} );
