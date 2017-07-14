const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const crudStudent = require('./crud-student')
const path = require('path')

const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)

app.use(staticMiddleware)
app.use(bodyParser.json())

app.get('/students', function (req, res) {
  crudStudent.listStudents()
    .then((students) => {
      res.json(students)
    })
})

app.post('/students', (req, res) => {
  const addStudent = req.body
  crudStudent.addStudent(addStudent)
    .then(() => {
      res.status(201).json(addStudent)
      console.log('done!')
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(500)
    })
})

app.listen(3000, () => {
  console.log('listening on 3000!')
})
