const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productorder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  orderPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
})

module.exports = ProductOrder
