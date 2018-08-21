const express = require('express');
const router = express.Router();
const {
  addArticle,
  getAllArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/article')
const {auth} = require('../helpers/auth')

router
  .post('/', auth ,addArticle)
  .get('/', getAllArticle)
  .put('/:id', updateArticle)
  .delete('/:id', deleteArticle)

module.exports = router;
