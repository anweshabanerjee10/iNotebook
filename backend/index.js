// const connectToMongo = require('./db')
// const express = require('express')
// connectToMongo()

// const app = express()
// const port = 5000
// var cors = require('cors')

// app.use(cors())
// app.use(express.json())

// const connectToMongo = require('./db')
// var cors = require('cors')

// connectToMongo()
// const express = require('express')
// const app = express()
// const port = 5000

// app.use(cors())

// app.use(express.json())

// Available routes

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`iNoteBook backend listening on port ${port}`)
// })
// app.listen(port, () => {
//   console.log(`iNotebook backend listening on port http://localhost:${port}`)
// })

const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
connectToMongo()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook app listening at http://localhost:${port}`)
})
