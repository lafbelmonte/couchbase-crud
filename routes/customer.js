const express = require('express')

const router = express.Router()

const { CustomerModel } = require('../models/customer')

router.post('/customer', async (req, res) => {
  try {
    const customer = await CustomerModel.create({
      ...req.body,
      purchases: []
    })

    return res.send(customer)
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

router.get('/customers', async (req, res) => {
  try {
    const customers = await CustomerModel.find({})

    return res.send(customers.rows)
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

module.exports = router
