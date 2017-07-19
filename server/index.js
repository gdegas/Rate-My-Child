const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const crudStudent = require('./crud-student')
const path = require('path')
const reports = require('./crud-reports')
const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)
const Twilio = require('twilio')
const tokens = require('./twilio-tokens')
const client = new Twilio(tokens.accountSid, tokens.authToken)

// function sendSms(student) {
//   client
//   .messages
//   .create({
//     to: '+17144833294',
//     from: '+15625487316' ,
//     body: student.name + ' \'s behavior report for today:' + student.,
// })
// .then(message => console.log(message))
// }

app.use(staticMiddleware)
app.use(bodyParser.json())

app.get('/students', function (req, res) {
  crudStudent.listStudents()
    .then((students) => {
      res.json(students)
    })
})

app.get('/students/:id', (req, res) => {
  crudStudent.getStudentById(req.params.id)
    .then(student => {
      res.status(200).json(student)
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(500)
    })
})

app.post('/reports', (req, res) => {
  const addReport = req.body
  reports
    .add(addReport)
    .then(() => {
      res.status(201).json(addReport)
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(500)
    })
  client
    .messages.create({
      to: '+17144833294',
      from: '+15625487316',
      body: 'Message sending is working'
    })
    .then(message => console.log(message))
})

app.post('/students', (req, res) => {
  const addStudent = req.body
  crudStudent.addStudent(addStudent)
    .then(() => {
      res.status(201).json(addStudent)
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(500)
    })
})

app.listen(3000, () => {
  console.log('listening on 3000!')
})
