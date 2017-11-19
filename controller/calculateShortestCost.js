const input = require('./input')

const getShortestCost = (routes, path) => {
  const start = routes.split('')[0]
  const end = routes.split('')[1]

  const INFINITY = 1/0
  let table = []
  let visited = []
  let unvisited = []
  let vertex = start
  let visiting = input[start]

  console.log(start, '-', end)
  // Init unvisited nodes
  Object.keys(path).map((node) => {
    unvisited.push(node)
    const row = {
      vertex: node,
      distance: INFINITY
    }
    table.push(row)
  })

  // Init table vertex, shortestFrom start, Previous
  // let index = table.findIndex(x => x.vertex === vertex)
  // table[index] = Object.assign({}, table[index], {shortestFromStart: 0})

  // Object.keys(visiting).map((to) => {
  //   let index = table.findIndex(x => x.vertex === to)
  //   table[index] = Object.assign(
  //     {},
  //     table[index],
  //     {shortestFromStart: visiting[to], previousVertex: vertex})
  // })

  // unvisited.splice(unvisited.indexOf(vertex), 1)
  // vertex = Object.keys(visiting).reduce((a, b) => a.value > b.value ? a : b)
  // visiting = input[vertex]

  let distance = 0
  let previous = null
  while (unvisited.length > 0) {
    console.log('vertex:\t', vertex)
    const vertexIndex = table.findIndex(x => x.vertex === vertex)

    // console.log()
    if (vertex === start) {
      // Update table
      table[vertexIndex] = updateVertex(table, vertexIndex, distance, previous)
    }

    Object.keys(visiting).map((to) => {
      distance = visiting[to] + table[vertexIndex].distance
      previous = vertex
      const nextVertexIndex = table.findIndex(x => x.vertex === to)
      // console.log('------')
      // console.log(table[nextVertexIndex])
      // console.log(distance)
      // console.log('------')

      // Update table
      if (distance < table[nextVertexIndex].distance) {
        table[nextVertexIndex] = updateVertex(table, nextVertexIndex, distance, previous)
      }
    })
    
    const sortedVisiting = Object.keys(visiting).sort((a, b) => visiting[a] - visiting[b])
    console.log('----')
    console.log(visiting)
    console.log(sortedVisiting[0])
    console.log('----')
    
    // Remove unvisited
    unvisited.splice(unvisited.indexOf(vertex), 1)

    // Next vertex is shortest
    vertex = Object.keys(visiting).reduce((a, b) => visiting[a] > visiting[b] ? b : a)
    visiting = input[vertex]


    // console.log(vertex)
    console.log(unvisited)
    console.log(table)
    // break
  }
}

const updateVertex = (table, index, distance, previous) => {
  return Object.assign({}, table[index], { distance, previous })
}

getShortestCost('ED', input)
