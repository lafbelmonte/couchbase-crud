const express = require('express')

const router = express.Router()

const { ItemModel } = require('../models/item')
const { CustomerModel } = require('../models/customer')
const { OrderModel } = require('../models/order')

router.post('/purchase', async (req, res) => {
  try {
    const { customerId, itemId, quantity } = req.body

    if (!customerId) {
      throw new Error(`Customer required`)
    }

    if (!itemId) {
      throw new Error(`Item required`)
    }

    if (!quantity) {
      throw new Error(`Quantity required`)
    }

    const customer = await CustomerModel.findById(customerId).catch((err) => {
      throw new Error(`Customer not found`)
    })

    await ItemModel.findById(itemId).catch((err) => {
      throw new Error(`Item not found`)
    })

    if (!customer.purchases.includes(itemId)) {
      customer.purchases.push(itemId)
    }

    await CustomerModel.updateById(customerId, {
      purchases: customer.purchases
    })

    const order = await OrderModel.create({
      item: itemId,
      customer: customerId,
      quantity
    })

    return res.send(order)
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

router.get('/orders/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params

    const orders = await OrderModel.find(
      { customer: customerId },
      { populate: ['customer', 'item'] }
    )

    return res.send(orders)
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

module.exports = router
