const mongoose = require("mongoose");
const Comment = require("../model/CommentModel")
exports.GetComment = async (req, res) =>{
  try {
      const comment = await Comment.find();
      res.json(comment);
  } catch (err) {
      res.json({ message: err });
  }
};

exports.CreateComment = async (req, res) => {
  const comment = new Comment({
    author: req.body.author,
    content: req.body.content,
    idProduct: req.body.idProduct
  });
  try {
    const savedComment = await comment.save().then((result) => {
      res.status(201).json({
        message: "Comment registered successfully!",
        userCreated: {
          author: result.author,
          content: result.content,
          idProduct: result.idProduct
        },
      });
    });
    res.json(savedComment);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.GetCommentById = async(req, res) => {
  try {
    const comment = await Comment.findById(req.params._id);
    res.json(comment);
} catch (err) {
    res.json({ message: err });
}
};

exports.DeleteComment = (req, res) => {
  Comment.remove({ _id: req.params._id }, function (err, response) {
    if (err) {
      res.status(201).json({
        code: 201,
        message: "Error From DeleteComment",
      });
    } else {
      res.status(200).json({
        code: 200,
        message: "DeleteComment Successfully!",
        data: response,
      });
    }
  });
};

exports.UpdateComment = async (req, res) => {
  const UpdateComment = {
    content: req.body.content
  };
  Comment.findByIdAndUpdate(
    { _id: req.params._id },
    UpdateComment,
    function (err, response) {
      if (err) {
        res.status(201).json({
          code: 201,
          message: "Error Update Comment",
        });
      } else {
        res.status(200).json({
          code: 200,
          message: "Update Comment Successfully!",
          data: response,
        });
      }
    }
  );
};