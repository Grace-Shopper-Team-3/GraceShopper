const adminOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('Access denied')
    err.status = 401
    return next(err)
  }
  next()
}

module.exports = {adminOnly}
