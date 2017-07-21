const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/ratemychild'
})

const reports = {
  add: (report) => {
    const query = knex
      .insert(report)
      .into('reports')
      .returning('*')
    return query
  },
  getByStudentId: (studentId) => {
    const query = knex
      .where('student_id', studentId)
      .select('*')
      .from('reports')
    return query
  }
}

module.exports = reports
