const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/ratemychild'
})

function addStudent(student) {
  const query = knex
    .insert(student)
    .into('students')
  return query
}

module.exports = addStudent
