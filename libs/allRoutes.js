const _ = require('lodash')

function Graph() {
  this.vertices = {}
  this.result = []
  
  this.addVertex = (u, v) => {
    this.vertices[u] = v
  }

  this.printAllPathsUtil = (u, d, visited, path, limit, sameOrigin) => {
    visited[u] = true
    path.push(u)

    if (u === d && path.length < limit + 2 && path.length > 1) {
      this.result.push(path.join(''))
      this.result = [...new Set(this.result)] // remove dupplicate
    } else {
      const keys = Object.keys(this.vertices[u])
      for (let i = 0; i < keys.length; i++) {
        const pathTemp1 = _.cloneDeep(path)
        const pathTemp2 = _.cloneDeep([u, keys[i]])

        if (sameOrigin ) {
          visited[u] = false
        }
        if (visited[keys[i]] === false) {
          this.printAllPathsUtil(keys[i], d, visited, path, limit)
        }
        if (pathTemp1.sort().join('') === pathTemp2.sort().join('')) {
          this.printAllPathsUtil(keys[i], d, visited, path, limit)
        }
      }
    }

    path.pop()
    visited[u] = false
  }

  this.printAllPaths = (s, d, limit) => {
    let visited = {}
    let sameOrigin = s === d
    Object.keys(this.vertices).map((vertex, key) => {
      visited[vertex] = false
    })

    let path = []
    this.printAllPathsUtil(s, d, visited, path, limit, sameOrigin)
  }
}

const allRoutes = (start, end, paths, maxStop) => {
  let g = new Graph()
  Object.keys(paths).map((path) => {
    g.addVertex(path, paths[path])
  })

  const max = parseInt(maxStop) === 0 ? 1/0 : parseInt(maxStop)
  
  g.printAllPaths(start, end, max)
  return g.result.length
}


module.exports = allRoutes
