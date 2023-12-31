'use strict'

const jwt = require('jsonwebtoken')
// devuelve un middleware que si no hay usuario responde con error
module.exports = function () {
  return function (req, res, next) {
    const token = req.body.token || req.query.token || req.get('Authorization')

    if (!token) {
      const err = new Error('no token provided')
      err.status = 401
      return next(err)
    }
    // tengo token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(err)
      }
      // guardo el id del usuario en request para que
      req.user = decoded

      next()
    })
  }
}
