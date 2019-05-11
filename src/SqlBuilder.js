class SqlBuilder {
  constructor(queryType) {
    this.type = queryType.toLowerCase()
    this._fields = []
    this._tables = []
    this._joins = []
    this._wheres = null
    this._params = []
    this._groups = []
    this._orders = []
    this._limit = null
    this._offset = null
  }

  select(...fieldArgs) {
    this._fields = fieldArgs
    return this
  }

  from(...tableArgs) {
    this._tables = tableArgs
    return this
  }

  join(table) {
    return this
  }

  where(whereStr, valuesArr) {
    this._wheres = whereStr
    this._params = valuesArr
    return this
  }

  group(...groupFieldArgs) {
    this._groups = groupFieldArgs
    return this
  }

  order(...orderFieldArgs) {
    this._orders = orderFieldArgs
    return this
  }

  limit(num) {
    this._limit = num
    return this
  }

  offset(num) {
    this._offset = num
    return this
  }

  sql() {
    if (this.type == 'select') {
      if (!this._tables.length) {
        throw 'FROM clause is required'
      }

      const selectClause = `SELECT ${this._fields.length ? this._fields.join(', ') : '*'} \n`
      const fromClause = `FROM ${this._tables.join(' ')} \n`
      const joinClause = `${this._joins.length ? ` ${this._joins.join(' ')} \n` : ''}`
      const whereClause = `${this._wheres ? `WHERE ${this._wheres} \n` : ''}`
      const groupClause = `${this._groups.length ? `GROUP BY ${this._groups.join(', ')} \n` : ''}`
      const orderClause = `${this._orders.length ? `ORDER BY ${this._orders.join(', ')} \n` : ''}`
      const limitClause = `${this._limit ? `LIMIT ${this._limit} \n` : ''}`
      const offsetClause = `${this._offset ? `OFFSET ${this._offset}` : ''}`

      return `${selectClause}${fromClause}${joinClause}${whereClause}${groupClause}${orderClause}${limitClause}${offsetClause}`
    }
  }
}

module.exports = SqlBuilder