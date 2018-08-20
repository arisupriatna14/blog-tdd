const express = require('express');
const router = express.Router();
const {
  addArticle,
  getAllArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/article')

router
  .post('/', addArticle)
  .get('/', getAllArticle)
  .put('/:id', updateArticle)
  .delete('/:id', deleteArticle)

module.exports = router;
