const { User } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //get one user by id
    getUserbyId({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thought',
            select: '-__v',
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //post for new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message:"No user found with this ID!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id} )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    
    //add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            { $push: {friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No User found with this ID!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //remove friend from user
    removeFriend({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
        .then(deletedFriend => {
            if (!deletedFriend) {
                return res.status(404).json({ message: "No User found with this ID!"});
            }
            return User.findOneAndUpdate(
                { _id: params.friendId },
                { $pull: { friends: params.friendId } },
                {new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No User found with this ID!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = userController;