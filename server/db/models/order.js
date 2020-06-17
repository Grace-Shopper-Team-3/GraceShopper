const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
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

module.exports = Order
