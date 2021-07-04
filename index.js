const express = require('express')
const { Ottoman } = require('ottoman')

const app = express()
const ottoman = new Ottoman({ collectionName: '_default' })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const db = ottoman.connect({
  connectionString: 'couchbase://localhost',
  bucketName: 'cus_ord',
  username: 'Administrator',
  password: 'password'
})

module.exports = {
  db
}

app.use(require('./routes/customer'))
app.use(require('./routes/item'))
app.use(require('./routes/order'))

db.start().then((err) => {
  if (err) {
    console.log(err)
  }
  const port = process.env.port || 8000
  app.listen(port, console.log(`Server started at port ${port}`))
})
