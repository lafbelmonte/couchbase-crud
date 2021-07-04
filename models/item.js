const { Schema } = require('ottoman/lib/schema/schema')
const { db } = require('../index')

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const ItemModel = db.model('Item', ItemSchema)

module.exports = {
  ItemSchema,
  ItemModel
}
