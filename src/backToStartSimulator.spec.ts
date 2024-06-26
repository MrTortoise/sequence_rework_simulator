import { simulate, findMedian } from './backToStartSimulator'


describe('median calculator will', () => {
  test('return undefined with no iteam', () => {
    expect(findMedian([])).toEqual(NaN)
  })

  test('return item with single iteam', () => {
    expect(findMedian([12])).toEqual(12)
   
  })

  test('return middle item with odd number', () => {
    expect(findMedian([12, 58, 100])).toEqual(58)
  })

  test('return mean of middle 2 numbers if even number of items', () => {
    expect(findMedian([12, 58, 70, 100])).toEqual((58 + 70) / 2)
  })

  test('the dataset input keeps the corect order', () => {
    const input = [12, 70, 58, 100]
    findMedian(input)
    expect(input).toEqual([12, 70, 58, 100])
  })
})

describe('simulator with 100% success', () => {
  test('one task will take time of task', () => {
    const tasks = [{ time: 100, failure: 0, name: 'dev' }]
    const result = simulate('single task', tasks, 100);
    expect(result.mean).toBe(100);
    //expect(result.breakdowns).toEqual([{ name: 'dev', total: 100 }])
    expect(result.median).toBe(100);
  })

  test('two tasks will be total', () => {
    const tasks = [{ time: 100, failure: 0, name: 'dev' }, { time: 100, failure: 0, name: 'test' }]
    const result = simulate('2 tasks, 100 duration, 0 failure', tasks, 100)
    expect(result.mean).toBe(200);
    expect(result.median).toBe(200);
  })
})

describe('simulator with 50% success', () => {
  const iterations = 1000000
  test('2 tasks task will a suprining amount of time', () => {
    const tasks = [{ time: 100, failure: 0, name: 'dev' }, { time: 100, failure: 0.5, name: 'test' }]//, { time: 100, failure: 0.5 }, { time: 100, failure: 0.5 }]
    const result = simulate('2 tasks, 100 duration, 50% failure of second', tasks, iterations)
    expect(result.mean).toBeGreaterThan(395);
    expect(result.mean).toBeLessThan(405);
    expect(result.median).toBeGreaterThanOrEqual(200);
    expect(result.median).toBeLessThanOrEqual(400);
    expect(result.mode).toBe(200);
  })

 

})
