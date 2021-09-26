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
            required: true
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thoughts'
            }
          ],
        friends: [
            {
              type: Schema.Types.ObjectId ,
              ref: 'User'
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

//total friend count
// UserSchema.virtual('friendCount').get(function() {
//     return this.friends.reduce(
//         (friends) => friends.length + 1
//     );
// });

const User = model('User', UserSchema);

module.exports = User;