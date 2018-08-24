const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  comment: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }
})

module.exports = mongoose.model('Comment', commentSchema)