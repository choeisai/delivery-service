const Routes = require('../models/routes')
const { pathCost, shortestPathCost, allRoutes } = require('../libs')

const init = () => {
  const router = require('express').Router()

  router.get('/', (req, res) => res.json({ message: 'Connected'}))
  // Create new routes
  router.route('/route')
    .post(async (req, res) => {
      const route = Routes({})

      try {
        const result = await route.save()

        debug.info(`route created: ${result._id}`)
        return res.json({ routeId: result._id, message: 'route created'})
      } catch (err) {
        return res.status(500).json(err)
      }
    })

  router.route('/route/:route_id')
    .put(async (req, res) => {
      const routeId = req.params.route_id
      const newRoute = req.body
      const key = Object.keys(newRoute)[0]
      const value = newRoute[key]

      try {
        const paths = {}
        paths[`paths.${key[0]}.${key[1]}`] = value
        const query = {_id: routeId}
        const updateValue = { $set: paths }
        
        const result = await Routes.findOneAndUpdate(
          query,
          updateValue,
          {upsert: true}
        )
        console.log(result)
        return res.json({})
      } catch (err) {
        return res.status(500).json(err)
      }
    })

  router.route('/pathcost')
    .get(async (req, res) => {
      const route_id = req.query.route
      const path = req.query.path

      try {
        const result = await Routes.findOne({_id: route_id})
        const cost = pathCost(path, result.paths)
        return res.json({ path: path.split('').join('-'), cost})
      } catch (err) {
        return res.status(500).json(err)
      }
    })

  router.route('/shortest')
    .get(async (req, res) => {
      const route_id = req.query.route
      const path = req.query.path
      const start = path[0]
      const end = path[1]

      try {
        const result = await Routes.findOne({_id: route_id})
        const cost = shortestPathCost(start, end, result.paths)
        return res.json({ path: path.split('').join('-'), cost})
      } catch (err) {
        return res.status(500).json(err)
      }
    })

  router.route('/allroutes')
    .get(async (req, res) => {
      const route_id = req.query.route
      const path = req.query.path
      const start = req.query.start
      const end = req.query.end
      const maxStop = req.query.maxStop

      try {
        const result = await Routes.findOne({_id: route_id})
        debug.info(result)
        const routes = allRoutes(start, end, result.paths, maxStop)
        return res.json({ routes: routes.length})
      } catch (err) {
        return res.status(500).json(err)
      }
    })

  return router
}

module.exports = init
