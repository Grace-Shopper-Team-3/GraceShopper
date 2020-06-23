const adminOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('Access denied')
    err.status = 401
    return next(err)
  }
  next()
}

const currentUserOnly = (req, res, next) => {
  if (req.user.id !== Number(req.params.userId)) {
    const err = new Error('Access denied')
    err.status = 401
    return next(err)
  }
  next()
}

module.exports = {adminOnly, currentUserOnly}
