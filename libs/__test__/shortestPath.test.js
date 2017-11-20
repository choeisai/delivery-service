const shortestPathCost = require('../shortestPathCost')
  
describe('libs/graph', () => {
  it('should return cheapest delivery route between E to D: 9', () => {
    const input = {
      A: {B: 1, C: 4, D: 10},
      B: {E: 3},
      C: {D: 4, F: 2},
      D: {E: 1},
      E: {B: 3, A: 2},
      F: {D: 1}
    }

    const output = shortestPathCost('E', 'D', input)
    expect(output).toEqual(9)
  })
  
  it('should return cheapest delivery route between E to E: 6', () => {
    const input = {
      A: {B: 1, C: 4, D: 10},
      B: {E: 3},
      C: {D: 4, F: 2},
      D: {E: 1},
      E: {B: 3, A: 2},
      F: {D: 1}
    }
    const output = shortestPathCost('E', 'E', input)
    expect(output).toEqual(6)
  })

  it('should return cheapest delivery route between A to F: 6', () => {
    const input = {
      A: {B: 1, C: 4, D: 10},
      B: {E: 3},
      C: {D: 4, F: 2},
      D: {E: 1},
      E: {B: 3, A: 2},
      F: {D: 1}
    }
    const output = shortestPathCost('A', 'F', input)
    expect(output).toEqual(6)
  })
})
