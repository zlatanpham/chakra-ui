import { isFunction } from "@chakra-ui/assertion-utils"

/**
 * When a value maybe be a function that return a value,
 * `runIfFn` checks if it's a function, invokes the function
 * with its argument and retuns the resolved value.
 *
 * ```js
 * import { runIfFn } from "@chakra-ui/function-utils"
 *
 * const checker = (x) => x * 2
 * const result = runIfFn(checker, 3) // => 6
 *
 * const checker = 9
 * const result = runIfFn(checker) // => 9
 * ```
 */
export const runIfFn = <T, U>(
  value: T | ((...args: U[]) => T),
  ...args: U[]
): T => (isFunction(value) ? value(...args) : value)

type EventHandler = (event: Event) => void

/**
 * Calls multiple event handlers in order until
 * one of the them calls `event.preventDefault()`
 *
 * ```js
 * import { callAllHandlers } from "@chakra-ui/function-utils"
 *
 * const onClick = () => {
 *   console.log("click 1")
 * }
 *
 * const onClick2 = (event) => {
 *   console.log(event.target)
 *   console.log("click 2")
 * }
 *
 * function Example(){
 *   return <button onClick={callAllHandlers(onClick, onClick2)}>Click me</button>
 * }
 * ```
 */
export const callAllHandlers = <T extends EventHandler>(
  ...fns: (T | undefined)[]
) => (event: Parameters<T>[0]) => {
  fns.some((fn) => {
    fn?.(event)
    return event?.defaultPrevented
  })
}

type AnyFunction = (...args: unknown[]) => void

/**
 * Similar to `callAllHandlers` except that it's not used for event
 * handlers and it calls all functions in order
 */
export const callAll = <T extends AnyFunction>(...fns: (T | undefined)[]) => (
  ...args: Parameters<T>
) => {
  for (const fn of fns) {
    fn?.(args)
  }
}

/**
 * Compose multiple functions, from right-to-left into a single function
 *
 * ```jsx
 * import { compose } from "@chakra-ui/function-utils"
 *
 * const getName = (p) => p.name;
 * const getLength = (str) => str.length;
 *
 * const fn = compose(getLength, getName)
 * const result = fn({ name: 'Sage' }) // => 4
 * ```
 */
export const compose = <T>(
  fn: (...args: T[]) => T,
  ...fns: Array<(...args: T[]) => T>
) => fns.reduce((f1, f2) => (...args) => f1(f2(...args)), fn)

/**
 * Compose multiple functions, from right-to-left into a single function
 * ```jsx
 * import { pipe } from "@chakra-ui/function-utils"
 *
 * const getName = (p) => p.name;
 * const getLength = (str) => str.length;
 *
 * const fn = pipe(getName, getLength)
 * const result = fn({ name: 'Sage' }) // => 4
 * ```
 */
export const pipe = <T>(...fns: Array<(a: T) => T>) => (v: T) =>
  fns.reduce((a, b) => b(a), v)

/**
 * Run a function once
 */
export const once = <T>(fn: (...args: T[]) => void) => {
  const calledRef = { current: false }
  return (...args: T[]) => {
    if (calledRef.current) return
    calledRef.current = true
    return fn(...args)
  }
}
