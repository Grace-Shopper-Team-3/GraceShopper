const router = require('express').Router()
const {User, Product, Order, ProductOrder} = require('../db/models')

const {adminOnly} = require('../utils')

// Get all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// Get a single product
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

// Add a new product for admins
router.post('/', adminOnly, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
})

// Edit a product for admins
router.put('/:id', adminOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
})

// Delete a product for admins
router.delete('/:id', adminOnly, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
