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
  get: (name) => {
    const query = knex
      .where('name', name)
      .select('*')
      .from('reports')
    return query
  }
}

module.exports = reports
