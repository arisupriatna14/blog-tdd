const express = require('express');
const router = express.Router();
const {
  addArticle,
  getAllArticle,
  updateArticle,
  deleteArticle,
  getMyArticle,
  getOneArticle
} = require('../controllers/article')
const { auth } = require('../helpers/auth')

router
  .post('/', auth, addArticle)
  .get('/', getAllArticle)
  .put('/:id', auth, updateArticle)
  .delete('/:id', auth, deleteArticle)
  .get('/my-articles', auth, getMyArticle)
  .get('/:id', getOneArticle)

module.exports = router;
