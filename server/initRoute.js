const router = require('express').Router()
const bodyParser = require('body-parser')

const initRoute = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use('', router)
  
  router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected2!' })
  })
}

const gracefulShutdown = (server, signal) => {
  debug.warn(`Received kill signal (${signal}), shutting down gracefullty`)
  server.close(() => {
    debug.warn('Closed out remaining connections.')
    process.exit()
  })
}

const init = ({ baseUrl }, app) => {
  // initRoute
  initRoute(app)
  
  // Server
  const { URL } = require('url')
  const url = new URL(baseUrl)
  let port = url.port

  if (url.protocol === 'https:') {
    port = 443
  }
  
  if (url.protocol === 'http:' && port === '') {
    port = 80
  }

  const server = app.listen(port)

  // Graceful server shutdown
  // listen for TERM signal e.g. kill
  process.on('SIGTERM', () => {
    gracefulShutdown(server, 'SIGTERM')
  })

  // listen for TERM signal e.g. Ctrl-c
  process.on('SIGINT', () => {
    gracefulShutdown(server, 'SIGINT')
  })
}

module.exports = init
