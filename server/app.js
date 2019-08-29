if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const mogran = require('morgan')
const cors = require('cors')
const port = process.env.PORT || 3000
const app = express()
const errHandler = require('./middlewares/error-handller')
const routes = require('./routes')

app.use(cors())
app.use(mogran('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Check Connection
mongoose.connect(`mongodb://ghiffariarw:${process.env.DB_PASS}@cluster0-shard-00-00-duzdl.mongodb.net:27017,cluster0-shard-00-01-duzdl.mongodb.net:27017,cluster0-shard-00-02-duzdl.mongodb.net:27017/${process.env.DB_COLLECT}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err), console.log(`Error connection to mongoose`)
  } else {
    console.log(`Success connect to mongoose`)
  }
})

app.use('/', routes)
app.use(errHandler)

app.listen(port, () => console.log(`You listen on port port`))