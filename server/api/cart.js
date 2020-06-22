const router = require('express').Router()

const {User, Product, Order, ProductOrder} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const carts = await ProductOrder.findAll()
    res.json(carts)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    if (req.params.userId !== req.session.userId) {
      res.send(500)
    }
    const userCart = await ProductOrder.findOne({where: {id: req.params.id}})
    res.json(userCart)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const createCart = await ProductOrder.create(req.body)
    res.status(201).json(createCart)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteCart = await ProductOrder.destroy({where: {id: req.params.id}})
    res.send(204).json(deleteCart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
