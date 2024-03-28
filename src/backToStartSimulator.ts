

export interface Task {
  time: number
  failure: number
  name: string
}

export type Breakdown = {
  [key: string]: number
}

export interface SimulateResult {
  name: string
  mean: number
  median: number
  mode: number
  iterations: number
}

export function simulate(name: string, tasks: Task[], iterations: number): SimulateResult {
  let total = 0
  let breakdown: Breakdown = {}
  const totalTimes: number[] = []

  for (let i = 0; i < iterations; i++) {
    const result = simulateToSuccess(tasks)
    total += result.totalTime
    totalTimes.push(result.totalTime)
    mergeBreakdowns(breakdown, result.breakdown)
  }

  const median = findMedian(totalTimes)
  const mean = total / totalTimes.length
  const mode = calculateMode(totalTimes)
  const max = totalTimes.reduce((acc, i) => i > acc ? i : acc, 0)

  const result = {name, mean, median, mode, max, iterations, tasks }
  console.log(result)
  return result
}

function mergeBreakdowns(lhs: Breakdown, rhs: Breakdown) {
  for (const key in Object.keys(rhs)) {
    if (!lhs[key]) {
      lhs[key] = rhs[key]
    } else {
      lhs[key] += rhs[key]
    }
  }
}
function calculateMode(arr: number[]) {
  let mode: number = NaN;
  let count = 0;
  const dict = {};

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    dict[num] = dict[num] ? dict[num] + 1 : 1;
    if (dict[num] > count) {
      mode = num;
      count = dict[num];
    }
  }

  return mode;
}

export function findMedian(dataSet: number[]) {
  const numbers = [...dataSet]
  //chat gpt
  // sort the array in ascending order
  numbers.sort(function (a, b) {
    return a - b;
  });

  var length = numbers.length;
  var middleIndex = Math.floor(length / 2);

  // check if the array has an even or odd number of elements
  if (length % 2 === 0) {
    // if even, return the average of the middle two elements
    return (numbers[middleIndex - 1] + numbers[middleIndex]) / 2;
  } else {
    // if odd, return the middle element
    return numbers[middleIndex];
  }
}

interface SimulateOnceResult {
  totalTime: number
  breakdown: Breakdown
}
function simulateToSuccess(tasks: Task[]): SimulateOnceResult {
  let completed = false
  let total = 0
  let breakdowns: Breakdown = {}
  while (!completed) {
    const { success, time, breakdown } = simulateLoop(tasks)
    total += time
    completed = success
    mergeBreakdowns(breakdowns, breakdown)
  }

  return { totalTime: total, breakdown: breakdowns }
}

interface Result {
  success: boolean
  time: number
  breakdown: Breakdown
}

function simulateLoop(tasks: Task[]): Result {
  let time = 0
  let breakdown: Breakdown = {}
  for (const t of tasks) {
    time += t.time
    let test = Math.random()
    if (!breakdown[t.name]) breakdown[t.name] = 0
    breakdown[t.name] += t.time
    if (test < t.failure) return { success: false, time, breakdown }
  }

  return { success: true, time, breakdown }

}