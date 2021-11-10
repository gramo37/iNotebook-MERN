const db = require('./db');
const express = require('express')
var cors = require('cors')
const port = 5000

db.connectToMongo()
const app = express()

 
app.use(cors())
app.use(express.json())   // Use json in our application

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

