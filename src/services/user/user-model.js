'use strict';

const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const userSchema = new Schema( 
    {
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        nickname: { 
            type: String 
        },
        color: { 
            type: String, 
            default: 'white' },
        roles: { 
            type: Array, 
            default: [ 'user' ], 
            required: true 
        },
        status: {
            online: { 
                type: Boolean, 
                default: false, 
                required: true 
            },
            lastSeen: Date,
            message: String,
            muted: { 
                type: Boolean, 
                default: false 
            },
            notifications: {
                type: Boolean,
                default: true
            }
        }
    }, 
    { 
        timestamps: { 
            createdAt: 'created_at', 
            updatedAt: 'updated_at' 
        } 
    } 
);

module.exports = mongoose.model( 'user', userSchema );
