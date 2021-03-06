const knex = require('knex')({
  dialect: 'pg',
  connection: process.env.DATABASE_URL
})

function listStudents() {
  const query = knex
    .select('*')
    .from('students')
  return query
}

function addStudent(student) {
  const query = knex
    .insert(student)
    .into('students')
  return query
}

function getStudentById(id) {
  const query = knex
    .where('id', id)
    .select('*')
    .from('students')
    .first()
  return query
}

module.exports = {
  addStudent,
  listStudents,
  getStudentById
}
