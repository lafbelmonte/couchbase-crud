const { Schema } = require('ottoman/lib/schema/schema')
const { db } = require('../index')
const { ItemSchema } = require('./item')
const { CustomerSchema } = require('./customer')

const OrderSchema = new Schema({
  item: {
    type: ItemSchema,
    ref: 'Item'
  },
  customer: {
    type: CustomerSchema,
    ref: 'Customer'
  },
  quantity: {
    type: Number,
    required: true
  }
})

const OrderModel = db.model('Order', OrderSchema)

module.exports = {
  OrderSchema,
  OrderModel
}
