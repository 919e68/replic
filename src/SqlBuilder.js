class SqlBuilder {
  constructor(queryType, indent = false) {
    this.type = queryType.toLowerCase()
    this._spacer = {
      space: indent ? `\n  ` : ' ',
      indent: indent ? `  ` : '',
      newline: indent ? `\n` : '',
    }

    this._fields = []
    this._tables = []
    this._joins = []
    this._wheres = null
    this._params = []
    this._groups = []
    this._orders = []
    this._limit = null
    this._offset = null

    this._into = null
    this._values = null
  }

  select(...fieldArgs) {
    this._fields = fieldArgs
    return this
  }

  from(...tableArgs) {
    this._tables = tableArgs
    return this
  }

  join(joinTableArg) {
    this._joins.push(joinTableArg)
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

  into(tableName) {
    this._into = tableName
    return this
  }

  values(dataArgs) {
    this._values = dataArgs
    return this
  }

  sql() {
    if (this.type == 'select') {
      if (!this._tables.length) {
        throw 'FROM clause is required'
      }

      const { space, indent, newline } = this._spacer
      const { _fields, _tables, _joins, _wheres, _groups, _orders, _limit, _offset } = this

      const selectClause = `SELECT${space}${_fields.length ? _fields.join(`,${space}`) : '*'} ${newline}`
      const fromClause = `FROM${space}${_tables.join(space)} ${newline}`
      const joinClause = `${_joins.length ? ` ${_joins.join(' ')} ${newline}` : ''}`
      const whereClause = `${_wheres ? `WHERE${space}${_wheres} ${newline}` : ''}`
      const groupClause = `${_groups.length ? `GROUP BY${space}${_groups.join(`,${space}`)} ${newline}` : ''}`
      const orderClause = `${_orders.length ? `ORDER BY${space}${_orders.join(`,${space}`)} ${newline}` : ''}`
      const limitClause = `${_limit ? `LIMIT${space}${_limit} ${newline}` : ''}`
      const offsetClause = `${_offset ? `OFFSET${space}${_offset} ${newline}` : ''}`

      return `${selectClause}${fromClause}${joinClause}${whereClause}${groupClause}${orderClause}${limitClause}${offsetClause};`

    } else if (this.type == 'insert') {
      const { _into, _values } = this
      const { space, indent, newline } = this._spacer

      let params = []
      let values = _values
      if (_values.constructor == Object) {
        values = [_values]
      }

      const fields = Object.keys(values[0])
      const fieldClause = `${indent ? space : ''}${fields.join(`,${space}`)}${indent ? newline: ''}`

      let fieldPlaceholder = []
      let valuesClause = []

      for (let i = 0; i < values.length; i++) {
        params = params.concat(Object.values(values[i]))
      }

      console.log(params)

      return `INSERT INTO ${_into} (${fieldClause})`
    }
  }
}

module.exports = SqlBuilder