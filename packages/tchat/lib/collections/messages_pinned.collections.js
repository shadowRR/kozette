/* MESSAGES PINNED */

MessagesPinned = new Mongo.Collection('messages_pinned');

MessagePinned = Astro.Class({
    name: 'MessagePinned',
    collection: MessagesPinned,
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
        }
    },
    behaviors: {
        timestamp: {
            createdFieldName: 'created_at',
            hasUpdatedField: false,
        }
    },
    indexes: {
        creation: {
            fields: {
                created_at: -1
            }
        }
    }
});
