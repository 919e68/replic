class Clause {
  constructor() {
    this.indent = {
      space: ' ',
      indent: '',
      newline: '',
    }
  }

  setIndent(indent) {
    this.indent = {
      space: indent ? `\n  `: ' ',
      indent: indent ? `  `: '',
      newline: indent ? `\n` : '',
    }
  }

  selectClause() {
    const { space, newline } = this.indent
    const { _fields } = this
    const fields = _fields.length ? _fields : ['*']

    return `SELECT${space}${fields.join(`,${space}`)}${newline}`
  }

  fromClause() {
    const { space, newline } = this.indent
    const { _tables, _joins } = this

    if (!_tables.length) {
      return ``
    }

    const tables = `${_tables.join(space)}`
    const joins = `${_joins.length ? `${space}${_joins.join(' ')} ` : ''}`

    return `FROM${space}${tables}${joins}${newline}`
  }

  whereClause() {
    const { space, newline } = this.indent
    const { _wheres } = this

    if (!_wheres) {
      return ``
    }

    return `WHERE${space}${_wheres}${newline}`
  }

  groupByClause() {
    const { space, newline } = this.indent
    const { _groups } = this

    if (!_groups.length) {
      return ``
    }

    return `GROUP BY${space}${_groups.join(`,${space}`)}${newline}`
  }

  orderByClause() {
    const { space, newline } = this.indent
    const { _orders } = this

    if (!_orders.length) {
      return ``
    }

    return `ORDER BY${space}${_orders.join(`,${space}`)}${newline}`
  }

  limitClause() {
    const { space, newline } = this.indent
    const { _limit } = this

    if (!_limit) {
      return ``
    }


    return `LIMIT${space}${_limit}${newline}`
  }

  offsetClause() {
    const { space, newline } = this.indent
    const { _offset } = this

    if (!_offset) {
      return ``
    }

    return `OFFSET${space}${_offset}${newline}`
  }
}

module.exports = Clause
