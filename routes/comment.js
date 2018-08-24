const express = require('express');
const router = express.Router();
const {
  addComment,
  deleteComment,
  getCommentByIdArticle
} = require('../controllers/comment')
const { auth } = require('../helpers/auth')

router
  .post('/', auth, addComment)
  .get('/:id', getCommentByIdArticle)
  .delete('/:id', auth, deleteComment)

module.exports = router;
