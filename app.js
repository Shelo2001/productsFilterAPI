require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')

const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const products = require('./routes/products')
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>')
})

app.use('/api/v1/products', products)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`server listening on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
