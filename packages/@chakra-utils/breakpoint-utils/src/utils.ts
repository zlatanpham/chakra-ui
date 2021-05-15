import { isNumber } from "@chakra-ui/assertion-utils"

type Dict = Record<string, any>

/**
 * Transform possibly pixel value to `px`
 */
export function px(value: number | string | null): string | null {
  if (value == null) return null
  const unitless = Number.parseFloat(value.toString()) == value
  return unitless || isNumber(value) ? `${value}px` : value
}

/**
 * Sort css breakpoints in ascending order to ensure media queries are generated
 * in the correct order and reference to each other correctly as well
 */
export function sortBreakpoints(breakpoints: Dict): Dict {
  return Object.fromEntries(
    Object.entries(breakpoints).sort((a, b) => {
      return Number.parseInt(a[1], 10) > Number.parseInt(b[1], 10) ? 1 : -1
    }),
  )
}

/**
 * Create an array-like value of the breakpoints (in asc order)
 *
 * ```js
 * const result = normalize({ sm: 320, md: 768 })
 * // => [320, 720, sm: 320, md: 768]
 * ```
 */
export function normalize(breakpoints: Dict) {
  const sorted = sortBreakpoints(breakpoints)
  return Object.assign(Object.values(sorted), sorted) as string[]
}

/**
 * Gets the ordered keys of the breakpoints (in asc order)
 *
 * ```js
 * const result = getOrderedKeys({ md: 768, base: 0, sm: 320 })
 * // => ["base", "sm", "md"]
 * ```
 */
export function getOrderedKeys(breakpoints: Dict): string[] {
  const value = Object.keys(sortBreakpoints(breakpoints))
  return Array.from(new Set(value))
}

const MEASUREMENT_REGEX = /(\d+\.?\d*)/u

/**
 * To ensure accurate min-max media query, this function subtract
 * 1px or 1/16 rem from the max value
 *
 * ```js
 * const result = subtract("40")
 * // => 39
 *
 * const result = subtract("320px")
 * // => 319
 *
 * const result = subtract("30rem")
 * // => 29.936rem
 * ```
 */
export function subtract(value: string) {
  if (!value) return value
  value = px(value) ?? value

  // the equivalent of 1px in em using a 16px base
  const unitRem = 0.0635
  const factor = value.endsWith("px") ? -1 : -unitRem

  return isNumber(value)
    ? `${value + factor}`
    : value.replace(
        MEASUREMENT_REGEX,
        (match) => `${Number.parseFloat(match) + factor}`,
      )
}
