const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = require('./productorder')

const Order = db.define('order', {
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('cart', 'in-progress', 'purchased', 'canceled'),
    allowNull: false,
    defaultValue: 'cart'
  }
})

// NEED TO CREATE CALCULATE PRICE FUNCTION
// Order.calculatePrice = async function() {
//   const products = await ProductOrder.findAll({
//     where: {
//       orderId: this.id
//     }
//   })
//   // calculate the total price of each product * quantity
// }

module.exports = Order
