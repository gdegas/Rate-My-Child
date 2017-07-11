const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/ratemychild'
})

const query = knex
  .insert({name: 'Sasha Degas', parent_name: 'Marcel Degas'})
  .into('students')

console.log(query.toString())

query
  .then(() => {
    console.log('added!')
  })
