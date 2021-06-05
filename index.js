const express = require('express')
const couchbase = require('couchbase')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const cluster = new couchbase.Cluster('couchbase://localhost', {
  username: 'Administrator',
  password: 'password'
})

module.exports = {
  cluster
}

app.use('/', require('./routes'))

const port = process.env.port || 8000
app.listen(port, console.log(`Server started at port ${port}`))
