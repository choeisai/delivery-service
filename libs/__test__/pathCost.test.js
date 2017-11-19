const pathCost = require('../pathCost')
  
describe('libs/graph', () => {
  it('should return delivery cost for route A-B-E: 4', () => {
    const input = {
      A: {B: 1, C: 4, D: 10},
      B: {E: 3},
      C: {D: 4, F: 2},
      D: {E: 1},
      E: {B: 3, A: 2},
      F: {D: 1}
    }

    const output = pathCost('ABE', input)
    expect(output).toEqual(4)
  })
  
  it('should return delivery cost for route A-D: 10', () => {
    const input = {
      A: {B: 1, C: 4, D: 10},
      B: {E: 3},
      C: {D: 4, F: 2},
      D: {E: 1},
      E: {B: 3, A: 2},
      F: {D: 1}
    }

    const output = pathCost('AD', input)
    expect(output).toEqual(10)
  })
  
  it('should return delivery cost for route E-A-C-F: 8', () => {
    const input = {
      A: {B: 1, C: 4, D: 10},
      B: {E: 3},
      C: {D: 4, F: 2},
      D: {E: 1},
      E: {B: 3, A: 2},
      F: {D: 1}
    }

    const output = pathCost('EACF', input)
    expect(output).toEqual(8)
  })
  
  it('should return delivery cost for route A-D-F: No Such Route', () => {
    const input = {
      A: {B: 1, C: 4, D: 10},
      B: {E: 3},
      C: {D: 4, F: 2},
      D: {E: 1},
      E: {B: 3, A: 2},
      F: {D: 1}
    }

    const output = pathCost('ADF', input)
    expect(output).toEqual('No Such Route')
  })

})
