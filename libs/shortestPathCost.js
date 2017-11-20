const getShortestTable = (start, paths) => {
  const INFINITY = 1/0
  let table = []
  let visited = []
  let unvisited = []
  let vertex = start
  let visiting = paths[start]
  let queue = []

  // console.log(start, '-', end)
  // Init unvisited nodes
  Object.keys(paths).map((node) => {
    unvisited.push(node)
    const row = {
      vertex: node,
      distance: INFINITY
    }
    table.push(row)
  })

  let distance = 0
  let previous = null
  while (unvisited.length > 0) {
    const vertexIndex = table.findIndex(x => x.vertex === vertex)

    if (vertex === start) {
      // Update table
      table[vertexIndex] = updateVertex(table, vertexIndex, distance, previous)
    }

    Object.keys(visiting).map((to) => {
      distance = visiting[to] + table[vertexIndex].distance
      previous = vertex
      const nextVertexIndex = table.findIndex(x => x.vertex === to)

      // Update table
      if (distance < table[nextVertexIndex].distance) {
        table[nextVertexIndex] = updateVertex(table, nextVertexIndex, distance, previous)
      }
    })
    
    // Remove unvisited
    const index = unvisited.indexOf(vertex)
    if (index > -1) {
      unvisited.splice(index, 1)
      visited.push(vertex)
      vertex = Object.keys(visiting).reduce((a, b) => visiting[a] > visiting[b] ? b : a)
      visiting = paths[vertex]
    } else {
      let a = []
      unvisited.map((node) => {
        const index = table.findIndex(x => x.vertex === node)
        if (table[index].previous) {
          a.push(table[index])
        }
      })

      vertex = a.reduce((a, b) => a.distance > b.distance ? b : a)
      vertex = vertex.vertex
      visiting = paths[vertex]

    }
      
  }

  return table
}

const updateVertex = (table, index, distance, previous) => {
  return Object.assign({}, table[index], { distance, previous })
}

const getShortestCost = (start, end, paths) => {
  const table = getShortestTable(start, paths)
  for (key in table) {
    if (table[key].vertex === end) {
      return table[key].distance
    }
  }
}

module.exports = getShortestCost
