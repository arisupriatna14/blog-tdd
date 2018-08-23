const express = require('express');
const router = express.Router();
const {
  addArticle,
  getAllArticle,
  updateArticle,
  deleteArticle,
  getMyArticle
} = require('../controllers/article')
const { auth } = require('../helpers/auth')

router
  .post('/', auth, addArticle)
  .get('/', getAllArticle)
  .put('/:id', auth, updateArticle)
  .delete('/:id', auth, deleteArticle)
  .get('/my-articles', auth, getMyArticle)

module.exports = router;
