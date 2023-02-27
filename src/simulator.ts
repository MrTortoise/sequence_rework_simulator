export interface Task {
  time: number
  failure: number
}

export function simulate(tasks: Task[], iterations: number) {
  const results: number[] = []
  for (let i = 0; i < iterations; i++) {
    const result = simulateOnce(tasks)
    results.push(result)
  }

  return { total: results.reduce((sum, r) => sum + r, 0) / results.length }
}

function simulateOnce(tasks: Task[]) {
  let completed = false;
  let total = 0
  while (!completed) {
    const { success, time } = simulateLoop(tasks)
    total += time
    completed = success

  }

  return total
}

interface Result {
  success: boolean
  time: number
}

function simulateLoop(tasks: Task[]): Result {
  let time = 0
  for (const t of tasks) {
    time += t.time
    let test = Math.random()
    if (test < t.failure) return { success: false, time }
  }

  return { success: true, time }

}