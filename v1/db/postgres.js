const pgHelper = require('@macrostrat/pg-helper')
const credentials = require('./credentials')

let pg = new pgHelper(credentials.pg)
module.exports = pg
