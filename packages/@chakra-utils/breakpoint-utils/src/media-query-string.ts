import { px } from "./utils"

type MediaQueryStringOption = {
  minW?: string | null
  maxW?: string
}

/**
 * Creates a media query string from the breakpoints,
 * using a combination of `min-width` and `max-width`
 */

export function getMediaQueryString(options: MediaQueryStringOption) {
  const { minW, maxW } = options
  const query = []
  if (minW != null) {
    query.push(`@media screen and (min-width: ${px(minW)})`)
  }
  if (query.length > 0 && maxW !== null) {
    query.push("and")
  }
  if (maxW != null) {
    query.push(`@media screen and (max-width: ${px(maxW)})`)
  }
  return query.join(" ")
}
