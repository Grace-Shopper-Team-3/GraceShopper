const router = require('express').Router()

const {User, Product, Order, ProductOrder} = require('../db/model')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const updateOrder = await Order.findByPk(req.params.id)
    res.json(updateOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
