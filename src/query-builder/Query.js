const Clause = require('./Clause')

class Query extends Clause {
  selectQuery() {
    let sqlString = ``
    sqlString = `${sqlString}${this.selectClause()}`
    sqlString = `${sqlString}${this.fromClause()}`
    sqlString = `${sqlString}${this.whereClause()}`
    sqlString = `${sqlString}${this.groupByClause()}`
    sqlString = `${sqlString}${this.orderByClause()}`
    sqlString = `${sqlString}${this.limitClause()}`
    sqlString = `${sqlString}${this.offsetClause()}`

    return sqlString
  }

  insertQuery() {

  }

  updateQuery() {

  }

  deleteQuery() {

  }

  sql() {
    const type = this.constructor.name

    if (type == 'Select') {
      return this.selectQuery()
    }
  }
}

module.exports = Query