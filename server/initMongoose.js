const init = async ({ mongoUrl }) => {
  const mongoose = require('mongoose')
  mongoose.Promise = global.Promise

  // Mongoose Event
  mongoose.connection.on('connected', () => debug.info(`MongoDB`, 'Connection Established'))
  mongoose.connection.on('reconnected', () => debug.info(`MongoDB`, 'Connection Reestablished'))
  mongoose.connection.on('disconnected', () => debug.info(`MongoDB`, 'Connection Disconnected'))
  mongoose.connection.on('close', () => debug.info(`MongoDB`, 'Connection Closed'))
  mongoose.connection.on('error', err => debug.error(`MongoDB`, err))

  return mongoose.connect(mongoUrl, {
    useMongoClient: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  })
}

module.exports = init
