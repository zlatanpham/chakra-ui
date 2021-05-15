import { isArray, isObject } from "@chakra-ui/assertion-utils"

/**
 * Calls a defined callback function on each value that might be responsive.
 * @param value The value to map over. Can be an array, object, null, string or number.
 * @param callbackfn A function that called one time for each element in the array or object.
 */
export function mapResponsive<T extends string | number>(
  value: T | null,
  callbackfn: (value: T | null) => string | number | null,
): T
export function mapResponsive<T extends any[]>(
  value: T | null,
  callbackfn: (value: T[number]) => string | number | null,
): T
export function mapResponsive<T extends Record<string, any>>(
  value: T | null,
  callbackfn: (value: keyof T) => string | number | null,
): T
export function mapResponsive(value: any, callbackfn: (value: any) => any) {
  if (isArray(value)) {
    return value.map((item) => {
      if (item == null) return null
      return callbackfn(item)
    })
  }

  if (isObject(value)) {
    return Object.keys(value).reduce((result, key) => {
      result[key] = callbackfn(value[key])
      return result
    }, {})
  }

  if (value != null) {
    return callbackfn(value)
  }

  return null
}
