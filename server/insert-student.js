const knex = require('knex')({
  dialect: 'pg',
  connection: process.env.DATABASE_URL
})

function addStudent(student) {
  const query = knex
    .insert(student)
    .into('students')
  return query
}

module.exports = addStudent
