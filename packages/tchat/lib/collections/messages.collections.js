/* MESSAGES */

Messages = new Mongo.Collection('messages');

Message = Astro.Class({
    name: 'Message',
    collection: Messages,
    fields: {
        user_id: {
            type: 'string',
            immutable: true,
            validator: [
                Validators.required(),
                Validators.string()
            ]
        },
        message: {
            type: 'string',
            immutable: true,
            validator: [
                Validators.required(),
                Validators.string(),
                Validators.minLength(0)
            ]
        },
        type: {
            type: 'string',
            immutable: true,
            validator: [
                Validators.required(),
                Validators.string(),
                Validators.choice(['basic', 'info'])
            ]
        }
    },
    behaviors: {
        timestamp: {
            createdFieldName: 'created_at',
            hasUpdatedField: false,
        }
    },
    indexes: {
        user: {
            fields: {
                user_id: 1
            }
        }
    }
});

Messages.allow({
    insert: function(user_id, doc){
        return doc && doc.user_id === user_id;
    }
});
