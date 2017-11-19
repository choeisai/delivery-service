const getCostFromRoute = (from, to, paths) => {
  return paths[from][to]
}

const getSummaryCost = (routes, paths) => {
  let sumCost = 0
  routes.split('').reduce((a, b, c) => {
    const cost = getCostFromRoute(a, b, paths)
    sumCost += cost
    return b
  })
  
  if (!sumCost) {
    sumCost = 'No Such Route'
  }
  return sumCost
}

module.exports = getSummaryCost
