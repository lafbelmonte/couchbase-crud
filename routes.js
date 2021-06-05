const express = require('express')

const router = express.Router()
const uuid = require('uuid')

const { cluster } = require('./index')

const bucket = cluster.bucket('persons')

const collection = bucket.defaultCollection()

const generateId = () => uuid.v4()

const type = 'person'

router.get('/persons', async (req, res) => {
  try {
    const persons = await cluster.query(
      `select meta().id, * from persons where type = '${type}'`
    )

    return res.send(persons.rows)
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

router.get('/person/:id', async (req, res) => {
  try {
    const { id } = req.params

    const person = await collection.get(id)

    return res.send(person)
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

router.delete('/person/:id', async (req, res) => {
  try {
    const { id } = req.params

    const result = await collection.remove(id)

    return res.send(result)
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

router.put('/person/:id', async (req, res) => {
  try {
    const { id } = req.params

    const document = ({ firstName, lastName, email } = req.body)

    if (!firstName) {
      throw new Error('First name is required.')
    }

    if (!lastName) {
      throw new Error('Last name is required.')
    }

    if (!email) {
      throw new Error('Email is required.')
    }

    const existingPersons = await cluster.query(
      `select * from persons where email = '${email}'`
    )

    if (existingPersons.rows.length > 0) {
      throw new Error('Email already exists.')
    }

    const result = await collection.replace(id, {
      ...document,
      type
    })

    return res.send(result)
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

router.post('/person', async (req, res) => {
  try {
    const key = generateId()
    const document = ({ firstName, lastName, email } = req.body)

    if (!firstName) {
      throw new Error('First name is required.')
    }

    if (!lastName) {
      throw new Error('Last name is required.')
    }

    if (!email) {
      throw new Error('Email is required.')
    }

    const existingPersons = await cluster.query(
      `select * from persons where email = '${email}'`
    )

    if (existingPersons.rows.length > 0) {
      throw new Error('Email already exists.')
    }

    const result = await collection.insert(key, {
      ...document,
      type
    })

    return res.send(result)
  } catch (err) {
    return res.status(400).send(err.message)
  }
})

module.exports = router
