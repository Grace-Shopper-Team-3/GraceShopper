const router = require('express').Router()

const {User, Product, Order, ProductOrder} = require('../db/models')

// router.get('/', async (req, res, next) => {
//   try {
//     const orders = await Order.findAll()
//     res.json(orders)
//   } catch (err) {
//     next(err)
//   }
// })

// router.get('/:id', async (req, res, next) => {
//   try {
//     const updateOrder = await Order.findByPk(req.params.id)
//     res.json(updateOrder)
//   } catch (error) {
//     next(error)
//   }
// })

//get all orders with the product order including the product
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{model: ProductOrder, include: [{model: Product}]}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//get individual order
router.get('/:id', async (req, res, next) => {
  try {
    const updateOrder = await Order.findByPk(req.params.id, {
      include: [{model: ProductOrder, include: [{model: Product}]}]
    })
    res.json(updateOrder)
  } catch (error) {
    next(error)
  }
})

//get user's order
router.get(':/user/:id', async (req, res, next) => {
  try {
    const userOrder = await User.findByPk(req.params.id)
    if (user.isAdmin) {
      Order.findAll({
        include: [{model: ProductOrder, include: [{model: Product}]}]
      })
      res.send(userOrder)
    } else {
      const userOrder = await Order.findAll({
        where: {userId: req.params.id},
        include: [{model: ProductOrder, include: [{model: Product}]}]
      })
      res.send(userOrder)
    }
  } catch (error) {
    next(error)
  }
})

//post route for an order
router.post('/user/:id', async (req, res, next) => {
  try {
    const postOrder = await Order.create(req.body)
    res.json(postOrder)
  } catch (error) {
    next(error)
  }
})

//post a new product order
router.post('/:id', async (req, res, next) => {
  try {
    const createOrder = await ProductOrder.create(req.body)
    const orderAndProduct = await ProductOrder.findByPk(createOrder.id, {
      include: [{model: Product}]
    })
    res.send(orderAndProduct)
  } catch (error) {
    next(error)
  }
})

//edit product order
router.put('productorder/:id', async (req, res, next) => {
  try {
    const updateAnOrder = await ProductOrder.update(req.body)
    res.sendStatus(200).json(updateAnOrder)
  } catch (error) {
    next(error)
  }
})

//delete a product order
router.delete('/productorder/:id', async (req, res, next) => {
  try {
    const deleteOrder = await ProductOrder.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204).json(deleteOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
