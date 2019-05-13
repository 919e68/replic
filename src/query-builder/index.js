const Select = require('./Select')
const Insert = require('./Insert')
const Update = require('./Update')
const Delete = require('./Delete')

class QueryFactory {
  create(type, indent = false) {
    let query = null
    if (type == 'select') {
      query = new Select()

    } else if (type == 'insert') {
      query = new Insert()

    } else if (type == 'update') {
      query = new Update()

    } else if (type == 'delete') {
      query = new Delete()
    }

    query.setIndent(indent)
    return query
  }
}

module.exports = QueryFactory