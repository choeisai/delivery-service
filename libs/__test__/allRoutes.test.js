const allRoutes = require('../allRoutes')
  
describe('libs/graph', () => {
  it('should return possible delivery route from E - D with a maximum of 4 stop: 4', () => {
    const input = {
      A: {B: 1, C: 4, D: 10},
      B: {E: 3},
      C: {D: 4, F: 2},
      D: {E: 1},
      E: {B: 3, A: 2},
      F: {D: 1}
    }

    const output = allRoutes('E', 'D', input, 4)
    expect(output).toEqual(4)
  })
  
  it('should return possible delivery route from E - E without using the same route twice in a delivery route', () => {
    const input = {
      A: {B: 1, C: 4, D: 10},
      B: {E: 3},
      C: {D: 4, F: 2},
      D: {E: 1},
      E: {B: 3, A: 2},
      F: {D: 1}
    }

    const output = allRoutes('E', 'E', input, 0)
    expect(output).toEqual(5)
  })
  
  it('should return possible delivery route from E - E that delivery cost is less than 20. Given that the same route can be used twice in a delivery route', () => {
    const input = {
      A: {B: 1, C: 4, D: 10},
      B: {E: 3},
      C: {D: 4, F: 2},
      D: {E: 1},
      E: {B: 3, A: 2},
      F: {D: 1}
    }

    const output = allRoutes('E', 'E', input, 0)
    expect(output).toEqual(29)
  })

})

