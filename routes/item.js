const express = require('express')

const router = express.Router()

const { ItemModel } = require('../models/item')

router.post('/item', async (req, res) => {
  try {
    const item = await ItemModel.create(req.body)

    return res.send(item)
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

router.get('/items', async (req, res) => {
  try {
    const items = await ItemModel.find({})

    return res.send(items.rows)
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

module.exports = router
