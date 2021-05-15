import { isObject } from "@chakra-ui/assertion-utils"
import { getMediaQueryString } from "./media-query-string"
import { getOrderedKeys, normalize, sortBreakpoints, subtract } from "./utils"

type Dict = Record<string, any>

export function getDetails(breakpoints: Dict) {
  const sorted = sortBreakpoints(breakpoints)
  return Object.entries(sorted).map(([breakpoint, minW], index, entries) => {
    // read the next entry
    let [, maxW] = entries[index + 1] ?? []
    // subtract 0.01 from next breakpoint
    maxW = Number.parseFloat(maxW) > 0 ? subtract(maxW) : undefined

    return {
      breakpoint,
      minW,
      maxW,
      maxWQuery: getMediaQueryString({ maxW }),
      minWQuery: getMediaQueryString({ minW }),
      minMaxQuery: getMediaQueryString({ minW, maxW }),
    }
  })
}

export function analyzeBreakpoints(breakpoints: Dict) {
  if (!breakpoints) return null
  breakpoints.base = breakpoints.base ?? "0px"

  const normalized = normalize(breakpoints)
  const details = getDetails(breakpoints)
  const keys = getOrderedKeys(breakpoints)

  return {
    // ordered breakpoint keys
    keys,

    // test if an object represents a responsive syntax
    isResponsive(test: Dict) {
      const keys = Object.keys(test)
      return keys.length > 0 && keys.every((key) => keys.includes(key))
    },

    // the sorted breakpoints object
    asObject: sortBreakpoints(breakpoints),

    // normalized breakpoints that includes both object and array breakpoints
    // [0, 320, 768, base:0, sm:320, md:768 ]
    asArray: normalized,

    details,

    // breakpoints array to be used for responsive array parsing
    media: [
      null,
      ...normalized.map((minW) => getMediaQueryString({ minW })).slice(1),
    ],

    // converts a responsive object syntax to array syntax
    toArrayValue(test: Dict): any[] {
      if (!isObject(test)) {
        throw new Error("toArrayValue: value must be an object")
      }
      const result = keys.map((bp) => test[bp] ?? null)
      const lastItem = result[result.length - 1]
      while (lastItem === null) {
        result.pop()
      }
      return result
    },

    // converts responsive array syntax to object syntax
    toObjectValue(test: any[]): Dict {
      if (!Array.isArray(test)) {
        throw new Error("toObjectValue: value must be an array")
      }
      return test.reduce((acc, value, index) => {
        const key = keys[index]
        if (key != null && value != null) acc[key] = value
        return acc
      }, {} as Dict)
    },
  }
}

export type AnalyzeBreakpointsReturn = ReturnType<typeof analyzeBreakpoints>
