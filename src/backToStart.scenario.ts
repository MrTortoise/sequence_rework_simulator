import { simulate } from "./backToStartSimulator";
const iterations = 1000000

describe("scenarios for back to start simulator", ()=>{
    test('3 tasks task will a suprining amount of time', () => {
        const tasks = [{ time: 100, failure: 0, name: 'dev' }, { time: 100, failure: 0.5, name: 'test' }, { time: 100, failure: 0.5, name: 'nearest' }]//, { time: 100, failure: 0.5 }]
        const result = simulate('3 tasks,100 duration, 2+3 have failure rate of 50%', tasks, iterations)
        expect(result.mean).toBeGreaterThan(995);
        expect(result.mean).toBeLessThan(1005);
        expect(result.median).toBeGreaterThanOrEqual(700);
        expect(result.median).toBeLessThanOrEqual(800);
        expect(result.mode).toBe(300);
      })
    
      
      test('3 tasks task with only QA failure a suprining amount of time', () => {
        const tasks = [{ time: 100, failure: 0, name: 'product' }, { time: 100, failure: 0, name: 'dev' }, { time: 100, failure: 0.5, name: 'QA' }]//, { time: 100, failure: 0.5 }]
        const result = simulate('3 tasks,100 duration, 3 has failure rate of 50%', tasks, iterations)
        expect(result.mean).toBeGreaterThan(598);
        expect(result.mean).toBeLessThan(601);
        expect(result.median).toBeGreaterThanOrEqual(299);
        expect(result.median).toBeLessThanOrEqual(601);
        expect(result.mode).toBe(300);
      })
    
      test('4 tasks task will a suprining amount of time', () => {
        const tasks = [{ time: 100, failure: 0, name: 'dev' }, { time: 100, failure: 0.5, name: 'test' }, { time: 100, failure: 0.5, name: 'nearest' }, { time: 100, failure: 0.5, name: 'int' }]
        const result = simulate('4 tasks: dev, test, qa, int, 100 duration - 50% failure', tasks, iterations)
        expect(result.mean).toBeGreaterThan(2195);
        expect(result.mean).toBeLessThan(2205);
        expect(result.median).toBe(1600);
        expect(result.mode).toBe(400);
      })
    
      test('2 tasks reversed  will a  less suprining amount of time', () => {
        const tasks = [{ time: 100, failure: 0.5, name: 'dev' }, { time: 100, failure: 0, name: 'test' }]//, { time: 100, failure: 0.5 }, { time: 100, failure: 0.5 }]
        const result = simulate('2 tasks, first  (50%) second does not. 100 duration', tasks, iterations)
        expect(result.mean).toBeGreaterThan(295);
        expect(result.mean).toBeLessThan(305);
        expect(result.median).toBeGreaterThanOrEqual(200);
        expect(result.median).toBeLessThanOrEqual(300);
        expect(result.mode).toBe(200);
      })
    
      test('4 tasks first reversed rest halved  will a suprining amount of time', () => {
        const tasks = [{ time: 100, failure: 0.5, name: 'dev' }, { time: 100, failure: 0, name: 'qa' }, { time: 100, failure: 0.25, name: 'int' }, { time: 100, failure: 0.25, name: 'uat' }]
        const result = simulate('4 tasks, dev (50%), qa (0%), int (25%), uat (25%)', tasks, iterations)
        expect(result.mean).toBeGreaterThan(843);
        expect(result.mean).toBeLessThan(853);
        expect(result.median).toBeGreaterThanOrEqual(700);
        expect(result.median).toBeLessThanOrEqual(800);
        expect(result.mode).toBe(400);
      })
    
})