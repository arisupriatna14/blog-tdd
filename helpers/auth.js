const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = {
  auth: (req, res, next) => {
    const { authorization } = req.headers
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY)

    User
      .findById({ _id: decoded.id})
      .then(() => {
        next()
      })
      .catch(err => {
        res.status(401).json({
          message: "Anda tidak memiliki akses untuk create article",
          errorAuth: err
        })
      })
  }
}