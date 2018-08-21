const Article = require('../models/article')

module.exports = {
  addArticle: (req, res) => {
    const { title, author, content } = req.body

    Article 
      .create({ title, author, content })
      .then(result => {
        res.status(201).json({
          message: "Create new article success",
          result
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  },

  getAllArticle: (req, res) => {
    Article.find({})
      .then(result => {
        res.status(200).json({
          message: "Get all list article succes",
          result
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  },

  updateArticle: (req, res) => {
    const { title, author, content } = req.body
    const { id } = req.params

    Article
      .findByIdAndUpdate({ _id: id}, {
        $set: { title, author, content }
      })
      .then(result => {
        res.status(200).json({
          message: "Update article success",
          result
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  },

  deleteArticle: (req, res) => {
    Article
      .deleteOne({ _id: req.params.id })
      .then(result => {
        res.status(200).json({
          message: "Delete Success",
          result
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  },
}