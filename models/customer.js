const { Schema } = require('ottoman')
const { db } = require('../index')
const { ItemSchema } = require('./item')

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  purchases: [
    {
      type: ItemSchema,
      ref: 'Item'
    }
  ]
})

const CustomerModel = db.model('Customer', CustomerSchema)

module.exports = {
  CustomerSchema,
  CustomerModel
}
