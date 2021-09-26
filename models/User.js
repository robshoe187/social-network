const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: () => Promise.resolve(false),
                message: 'Email validation failed'
              }
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thoughts'
            }
          ],
        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'friends'
            }
          ]  
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//check for email validation
user.validate().catch(error => {
    assert.ok(error);
    assert.equal(error.errors.message, 'Email validation failed');
  });
UserSchema.virtual('friendCount').get(function(){
    return this.friends.reduce(
        (total, friends) => friends.length + 1
    );
});

  const User = model('User', UserSchema);

  module.exports = Pizza;