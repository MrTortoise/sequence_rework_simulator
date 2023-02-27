import { simulate } from './simulator'

describe('simulator with 100% success', () => {
  test('one task will take time of task', () => {
    const tasks = [{ time: 100, failure: 0 }]
    expect(simulate(tasks, 100)).toBe(100);
  })

  test('two tasks will be total', () => {
    const tasks = [{ time: 100, failure: 0 }, { time: 100, failure: 0 }]
    expect(simulate(tasks, 100)).toBe(200);
  })
})

describe('simulator with 50% success', () => {
  test('2 tasks task will a suprining amount of time', () => {
    const tasks = [{ time: 100, failure: 0.5 }, { time: 100, failure: 0 }, { time: 100, failure: 0.25 }, { time: 100, failure: 0.25 }]
    const result = simulate(tasks, 1000000)
    expect(result).toBeGreaterThan(395);
    expect(result).toBeLessThan(405);
  })

  // test('2 tasks task will a suprining amount of time', () => {
  //   const result = simulate(tasks, 10000)
  //   expect(result).toBeGreaterThan(395);
  //   expect(result).toBeLessThan(405);
  // })


})
