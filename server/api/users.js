const router = require('express').Router()
const {User, Order, Product, ProductOrder} = require('../db/models')

const {adminOnly} = require('../utils')

// get all users for admin settings
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

// get a single user
router.get('/:id', adminOnly, async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id)
    res.json(singleUser)
  } catch (error) {
    next(error)
  }
})

// delete a user for admin settings
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

// get a user's cart
router.get('/cart/:userId', async (req, res, next) => {
  try {
    const cartItems = await Product.findAll({
      include: {
        model: Order,
        where: {
          userId: req.params.userId,
          status: 'cart'
        }
      }
    })

    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

// add a product to a user's cart
router.put('/cart/:userId', adminOnly, async (req, res, next) => {
  try {
    // find the product in the db
    const product = await Product.findByPk(req.body.id)

    // find the user cart order
    const currentOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'cart'
      }
    })

    // if the cart does not exist yet, create the cart
    if (!currentOrder) {
      const currentOrder = await Order.create({
        userId: req.params.userId,
        status: 'cart'
      })

      await ProductOrder.create({
        orderId: currentOrder.id,
        productId: req.body.id,
        quantity: 1,
        purchasePrice: product.price
      })
    }

    // if the cart does exist, add the product to the cart

    if (currentOrder) {
      await ProductOrder.create({
        orderId: currentOrder.id,
        productId: req.body.id,
        quantity: 1,
        purchasePrice: product.price
      })
    }

    // retrieve the newly added item
    const newItem = await ProductOrder.findOne({
      where: {
        productId: product.id,
        orderId: currentOrder.id
      }
    })

    res.json(newItem)
  } catch (error) {
    next(error)
  }
})

//delete item from user's cart

router.delete('/cart/:userId/:productId', async (req, res, next) => {
  try {
    const removedProduct = await Product.findByPk(req.params.productId)
    const currentOrder = await Order.findOne({
      where: {userId: req.params.userId, status: 'cart'}
    })
    await currentOrder.removeProduct(removedProduct)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// route to checkout cart
router.put('/checkout/:userId/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {userId: req.params.userId, status: 'cart'}
    })
    order.status = 'purchased'
    await order.save()
  } catch (error) {
    next(error)
  }
})

module.exports = router
