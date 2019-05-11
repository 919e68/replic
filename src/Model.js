const pluralize = require('./helpers/pluralize')

class Model {
  constructor() {
    console.log(`${this.constructor.name} initiated`)
  }

  static find(id) {
    const tableName = Model.getTableName(this)
    console.log(`SELECT * FROM ${tableName} WHERE id = ${id} LIMIT 1`)
  }

  static first() {
    const tableName = Model.getTableName(this)
    console.log(`SELECT * FROM ${tableName} LIMIT 1`)
  }

  static all() {
    const tableName = Model.getTableName(this)
    console.log(`SELECT * FROM ${tableName}`)
  }

  static findBy(fields = {}) {
    const tableName = Model.getTableName(this)
    const whereFields = Object.keys(fields).map(field => `${field} = ?`)
    const whereValues = Object.values(fields)
    const whereClause = `${whereFields.length ? ' WHERE ' : ''}${whereFields.join(' AND ')}`

    console.log(`SELECT * FROM ${tableName}${whereClause},`, whereValues)
  }

  static foo() {
    let table = Model.getTableName(this)
    console.log(table)
  }

  static getTableName(model) {
    const schema = model.schema
    return model.table ? model.table : pluralize(model.name.toLowerCase())
  }

  save() {
    console.log(`save data from ${this.constructor.name}`)
  }
}

Model.schema = {
  table: null,
  fields: {}
}

Model.fields = []
Model.table = ''
Model.joins = []

module.exports = Model