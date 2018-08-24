const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

module.exports = {
  addComment: (req, res) => {
    const { comment, articleId } = req.body
    const { authorization } = req.headers
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY)
    Comment
      .create({
        user: decoded.id,
        article: articleId,
        comment: comment,
      })
      .then(result => {
        res.status(201).json({
          message: "Add comment success",
          result
        })
      })
      .catch(err => {
        res.status(500).json({
          errorAddComment: err
        })
      })
  },

  deleteComment: (req, res) => {
    const { id } = req.params

    Comment
      .findByIdAndRemove({ _id: id })
      .then((result) => {
        res.status(200).json({
          message: "Delete success",
          result
        })
      })
      .catch((err) => {
        res.status(500).json({
          errDelete: err
        })
      })
  },

  getCommentByIdArticle: (req, res) => {
    const { id } = req.params

    Comment
      .find({ article: id })
      .populate('user', 'email')
      .then((result) => {
        res.status(201).json({
          message: 'Get comment success',
          result
        })
      })
      .catch((err) => {
        res.status(500).json({
          errGetCommentByIdArticle: err
        });
      })

  }
}