const init = () => {
  const router = require('express').Router()

  router.get('/', (req, res) => res.json({ message: 'Connected'}))

  return router
}

module.exports = init
