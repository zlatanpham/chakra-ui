import { SystemStyleObject } from "@chakra-ui/system"
import { Dict, runIfFn } from "@chakra-ui/utils"

export interface GlobalStyleProps {
  colorScheme: string
  colorMode: "light" | "dark"
  theme: Dict
}

export type GlobalStyles = {
  global?: SystemStyleObject | ((props: GlobalStyleProps) => SystemStyleObject)
}

export type JSXElementStyles = {
  [K in keyof JSX.IntrinsicElements]?: SystemStyleObject
}

export { runIfFn }

export type Styles = GlobalStyles & JSXElementStyles

export function mode(light: any, dark: any) {
  return (props: Dict) => (props.colorMode === "dark" ? dark : light)
}

export function orient(options: {
  orientation?: "vertical" | "horizontal"
  vertical: any
  horizontal: any
}) {
  const { orientation, vertical, horizontal } = options
  if (!orientation) return {}
  return orientation === "vertical" ? vertical : horizontal
}

const joinParts = (...values: string[]) => values.join(".")

function toPart(value: string) {
  const attrs = {
    "data-part": value,
  }

  const dataSelector = Object.entries(attrs).map(
    ([prop, value]) => `[${prop}="${value}"]`,
  )

  const selector = `&${dataSelector},${dataSelector}`
  const childOf = `${selector} &`
  const part = {
    attrs,
    childOf,
    selector,
    toString: () => selector,
  }

  return part as typeof part & string
}

export type ComponentPart = ReturnType<typeof toPart>

export function scope<Root extends string>(root: Root) {
  return {
    parts: <PartNames extends string[]>(...values: PartNames) =>
      values.reduce((map, part) => {
        const partStr = joinParts(root, part)
        map[part] = toPart(partStr)
        return map
      }, {} as Record<PartNames[number], ComponentPart>),
  }
}
