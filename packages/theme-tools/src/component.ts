import { SystemStyleObject } from "@chakra-ui/system"
import { Dict, runIfFn } from "@chakra-ui/utils"

export interface StyleConfig {
  baseStyle?: SystemStyleObject
  sizes?: { [size: string]: SystemStyleObject }
  variants?: { [variant: string]: SystemStyleObject }
  defaultProps?: {
    size?: string
    variant?: string
    colorScheme?: string
  }
}

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

export function part(componentName: string, partName: string) {
  const dataPart = `${componentName.toLowerCase()}.${partName}`
  const selector = `[data-part="${dataPart}"]`
  return `&${selector},${selector}`
}
