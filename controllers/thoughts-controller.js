const { Thoughts, User } = require('../models');

const thoughtController = {

    //get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });            
    },

    getSingleThought({ params }, res) {
        Thoughts.findOne({ _id: params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    createThought({ body }, res) {
        Thoughts.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //update a thought by id
    updateThought({ params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this ID!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    
    //delete a thought by its id
    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
     
    //add a reaction to a thought
    addReaction({ params }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this ID!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //delete a reaction to a thought
    deleteReaction({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.reactionId})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;
