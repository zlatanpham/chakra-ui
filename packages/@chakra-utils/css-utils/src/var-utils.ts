import { isDecimal } from "@chakra-ui/assertion-utils"

function replaceWhiteSpace(value: string, replaceValue = "-") {
  return value.replace(/\s+/g, replaceValue)
}

function escape(value: string | number) {
  const valueStr = replaceWhiteSpace(value.toString())
  if (valueStr.includes("\\.")) return value
  return isDecimal(value) ? valueStr.replace(".", `\\.`) : value
}

export function addPrefix(value: string, prefix = "") {
  return [prefix, escape(value)].filter(Boolean).join("-")
}

export function toVarRef(name: string, fallback?: string) {
  return `var(${escape(name)}${fallback ? `, ${fallback}` : ""})`
}

export function toVar(value: string, prefix = "") {
  return `--${addPrefix(value, prefix)}`
}

export type CSSVarOptions = {
  fallback?: string
  prefix?: string
}

export function cssVar(name: string, options: CSSVarOptions) {
  const cssVariable = toVar(name, options.prefix)
  return {
    var: cssVariable,
    varRef: toVarRef(cssVariable, options.fallback),
  }
}
