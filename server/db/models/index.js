const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const ProductOrder = require('./productorder')

Order.belongsTo(User)
User.hasMany(Order)

Order.hasMany(ProductOrder)
ProductOrder.belongsTo(Order)

Order.belongsToMany(Product, {through: ProductOrder})
Product.belongsToMany(Order, {through: ProductOrder})

module.exports = {
  User,
  Product,
  Order,
  ProductOrder
}
