const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productorder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = ProductOrder
