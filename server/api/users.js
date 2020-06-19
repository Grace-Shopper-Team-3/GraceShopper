const router = require('express').Router()
const {User} = require('../db/models')

const {adminOnly} = require('../utils')

router.get('/', adminOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users’ passwords are encrypted, it won’t help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id)
    res.json(singleUser)
  } catch (error) {
    next(error)
  }
})

// router.post('/', async (req, res, next) => {
//   try {

//     const foundUser = await User.create(req.body)
//     res.status(201).send(foundUser)
//   } catch (error) {
//     next(error)
//   }
// })

router.delete('/:id', adminOnly, async (req, res, next) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).send(deletedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router
