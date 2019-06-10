/*
 * @Author: saber2pr
 * @Date: 2019-06-10 11:52:45
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-10 13:56:31
 */
import { diff } from './diff'

// fiber

export interface Fiber {
  next: Fiber
  type: Function
  effects?: Function[]
  state?: any
  memos?: any[]
}

function link(...effects: Function[]) {
  return effects.reduceRight<Fiber>((next, type) => ({ next, type }), null)
}

// work loop

let current: Fiber
const nextTicks: Function[] = []

function collect(fiber: Fiber) {
  nextTicks.push(...fiber.effects)
}

function dispatch(fiber: Fiber) {
  while ((current = fiber)) {
    fiber.type()

    collect(fiber)

    fiber = fiber.next
  }
}

// hooks

export function useState<T>(state: T): [T, (value: T) => void] {
  const fiber = current

  const setState = (state: T) => {
    fiber.state = state

    if (current) {
      if (!fiber.effects) fiber.effects = []

      fiber.effects.push(() => dispatch(fiber))
    } else {
      dispatch(fiber)
    }
  }

  return [fiber.state || state, setState]
}

export function useMemo<T>(fn: Function, deps?: T[]) {
  const fiber = current
  if (!fiber.memos) fiber.memos = []

  return () => {
    const memos = fiber.memos

    if (memos.find(d => diff(d, deps))) return

    fn()
    deps && memos.push(deps)
  }
}

export function useEffect<T>(effect: Function, deps: T[] = []) {
  const fiber = current
  if (!fiber.effects) fiber.effects = []

  useMemo(() => {
    const effects = fiber.effects

    effects.push(effect)
  }, deps)()
}

// render

export function render(...effects: Function[]) {
  dispatch(link(...effects))

  nextTicks.forEach(t => t())
}
