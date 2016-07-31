const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const messageSchema = new Schema( 
	{
	    user_id: { 
	    	type: String, 
	    	required: true 
	    },
	    text: { 
	    	type: String, 
	    	required: [ true, 'The message text is required' ], 
	    	minlength: [ 1, 'The message has to contain at least 1 character' ] 
	    },
	    pinned: { 
	    	type: Boolean, 
	    	default: false 
	    },
	    type: { 
	    	type: String, 
	    	default: 'basic' 
	    }
	}, 
	{ 
		timestamps: { 
			createdAt: 'created_at', 
			updatedAt: 'updated_at' 
		} 
	} 
);

module.exports = mongoose.model( 'message', messageSchema );
