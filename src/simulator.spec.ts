import { simulate } from './simulator'

describe('simulator with 100% success', () => {
  test('one task will take time of task', () => {
    const tasks = [{ time: 100, failure: 0, name: 'dev' }]
    expect(simulate(tasks, 100).total).toBe(100);
  })

  test('two tasks will be total', () => {
    const tasks = [{ time: 100, failure: 0, name: 'dev' }, { time: 100, failure: 0, name: 'test' }]
    expect(simulate(tasks, 100).total).toBe(200);
  })
})

describe('simulator with 50% success', () => {
  test('2 tasks task will a suprining amount of time', () => {
    const tasks = [{ time: 100, failure: 0, name: 'dev' }, { time: 100, failure: 0.5, name: 'test' }]//, { time: 100, failure: 0.5 }, { time: 100, failure: 0.5 }]
    const result = simulate(tasks, 1000000)
    expect(result.total).toBeGreaterThan(395);
    expect(result.total).toBeLessThan(405);
  })

  test('3 tasks task will a suprining amount of time', () => {
    const tasks = [{ time: 100, failure: 0, name: 'dev' }, { time: 100, failure: 0.5, name: 'test' }, { time: 100, failure: 0.5, name: 'nearest' }]//, { time: 100, failure: 0.5 }]
    const result = simulate(tasks, 1000000)
    expect(result.total).toBeGreaterThan(995);
    expect(result.total).toBeLessThan(1005);
  })

  test('4 tasks task will a suprining amount of time', () => {
    const tasks = [{ time: 100, failure: 0, name: 'dev' }, { time: 100, failure: 0.5, name: 'test' }, { time: 100, failure: 0.5, name: 'nearest' }, { time: 100, failure: 0.5, name: 'int' }]
    const result = simulate(tasks, 1000000)
    expect(result.total).toBeGreaterThan(2195);
    expect(result.total).toBeLessThan(2205);
  })

  test('2 tasks reversed  will a  less suprining amount of time', () => {
    const tasks = [{ time: 100, failure: 0.5, name: 'dev' }, { time: 100, failure: 0, name: 'test' }]//, { time: 100, failure: 0.5 }, { time: 100, failure: 0.5 }]
    const result = simulate(tasks, 1000000)
    expect(result.total).toBeGreaterThan(295);
    expect(result.total).toBeLessThan(305);
  })

  test('4 tasks first reversed rest halved  will a suprining amount of time', () => {
    const tasks = [{ time: 100, failure: 0.5, name: 'dev' }, { time: 100, failure: 0, name: 'test' }, { time: 100, failure: 0.25, name: 'nearest' }, { time: 100, failure: 0.25, name: 'int' }]
    const result = simulate(tasks, 1000000)
    expect(result.total).toBeGreaterThan(843);
    expect(result.total).toBeLessThan(853);
  })


})
