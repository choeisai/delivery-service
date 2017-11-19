require('./debug')

const start = async () => {
  // Initializer
  const config = require('./config')
  const initializer = require('./initializer')
  await initializer(config)
  
  debug.info(`Services API is ready to use:\t${process.env.NODE_ENV}`)
  debug.info(`Services API is running on:\t${process.env.BASE_URL}`)
}

module.exports = {
  start
}
