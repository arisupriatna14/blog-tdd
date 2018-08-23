const Article = require('../models/article')
const jwt = require('jsonwebtoken')

module.exports = {
  addArticle: (req, res) => {
    const { title, author, content } = req.body
    const { authorization } = req.headers
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY)

    Article 
      .create({
        user: decoded.id,
        title: title,
        author: author,
        content: content        
      })
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
    var resultArr = []
    Article.find({})
      .then(result => {
        result.forEach(article => {
          resultArr.push({
            id: article._id,
            title: article.title,
            author: article.author,
            content: article.content
          })
        })
        res.status(200).json({
          message: "Get all list article succes",
          resultArr
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  },

  getMyArticle: (req, res) => {
    const { authorization } = req.headers
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY)

    Article
      .find({ user: decoded.id })
      .populate('user', 'email')
      .then(result => {
        res.status(200).json({
          message: "Get all my articles success",
          result
        })
      })
      .catch(err => {
        res.status(500).json({
          errorGetMyArticle: err
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