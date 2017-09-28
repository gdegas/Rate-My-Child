const knex = require('knex')({
  dialect: 'pg',
  connection: process.env.DATABASE_URL
})

const reports = {
  add: (report) => {
    const query = knex
      .insert(report)
      .into('reports')
    return query
  }
}

module.exports = reports
