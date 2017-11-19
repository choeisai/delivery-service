

module.exports = async (config) => {
  // Express
  const app = require('./initExpress')(config)
  const router = require('./initRoute')(config, app)
}
