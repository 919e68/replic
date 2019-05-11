class Replic {
  constructor(config) {
    this.config = Object.assign({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306
    }, config)
  }
}

module.exports = Replic