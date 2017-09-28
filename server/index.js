require('dotenv').config()
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
const fecha = require('fecha')
const client = new Twilio(tokens.accountSid, tokens.authToken)

app.use(staticMiddleware)
app.use(bodyParser.json())

app.get('/students', function (req, res) {
  crudStudent.listStudents()
    .then((students) => {
      res.json(students)
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(500)
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
    .then(report => {
      if (req.query.send === 'true') {
        crudStudent.getStudentById(addReport.student_id)
          .then(student => {
            client.messages
              .create({
                to: student.parent_sms,
                from: tokens.twilioNumber,
                body: student.name + '\'s behavior report ' + fecha.format(report[0].log_date, 'MM-DD-YYYY') + ': ' + addReport.color + ', COMMENTS: ' + addReport.log_comment
              })
              .then(message => {
              })
              .catch(error => console.log(error))
          })
      }
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      console.log(error)
      res.sendStatus(500)
    })
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

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on 3000!')
})
