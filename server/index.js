const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const insertStudent = require('./insert-student')
const path = require('path')

const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)

app.use(staticMiddleware)
app.use(bodyParser.json())

// app.get('/students', (req, res) => {
//   const query = knex.select().from('students')
//   console.log(query.toString())
//   query.then()
// })

app.post('/students', (req, res) => {
  const addStudent = req.body
  insertStudent(addStudent)
    .then(() => {
      res.sendStatus(201)
    })
})

app.listen(3000, () => {
  console.log('listening on 3000!')
})
