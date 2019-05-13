const Query = require('./Query')

class Select extends Query {
  constructor() {
    super()
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

  select(...fields) {
    this._fields = fields
    return this
  }

  from(...tables) {
    this._tables = tables
    return this
  }

  join(joinTables) {
    this._joins.push(joinTables)
    return this
  }

  where(wheres, params) {
    this._wheres = wheres
    this._params = params
    return this
  }

  group(...groups) {
    this._groups = groups
    return this
  }

  order(...orders) {
    this._orders = orders
    return this
  }

  limit(limit) {
    this._limit = limit
    return this
  }

  offset(offset) {
    this._offset = offset
    return this
  }
}

module.exports = Select