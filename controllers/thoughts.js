const { Thought, User } = require("../models");

(module.exports = {
  // create a new thought here
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return Thought.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
}),
  deleteThought(req, res);
Thought.findOneAndRemove({ _id: req.params.thoughtId })
  .then((thought) =>
    !thought
      ? res
          .status(404)
          .json({ message: "Thought created but no user with this id!" })
      : res.json({ message: "Thought successfully deleted!" })
  )
  .catch((err) => res.status(500).json(err));
// Remove thought response
removeThoughtResponse(req, res);
Thought.findOneAndUpdate(
  { _id: req.params.thoughtId },
  { $pull: { reactions: { responseId: req.params.responseId } } },
  { runValidators: true, new: true }
)
  .then((thought) =>
    !thought
      ? res.status(404).json({ message: "No thought with this id!" })
      : res.json(thought)
  )
  .catch((err) => res.status(500).json(err));
