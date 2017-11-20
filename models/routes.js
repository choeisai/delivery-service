const mongoose = require('mongoose')
const Schema = mongoose.Schema

const route = new Schema({
  paths: {type: Schema.Types.Mixed}
}, {
  timestamps: true
})

const routeModel = mongoose.model('route', route)

module.exports = routeModel
