import { extendTheme } from "./extend-theme"
import { ChakraTheme, ThemeConfig, ThemeDirection } from "@chakra-ui/theme"
import { ColorMode } from "@chakra-ui/color-mode"
const direction = "ltr" as ThemeDirection

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "light" as ColorMode,
  cssVarPrefix: "chakra" as string,
}

const foundations: Pick<
  ChakraTheme,
  | "borders"
  | "breakpoints"
  | "colors"
  | "radii"
  | "shadows"
  | "sizes"
  | "space"
  | "transition"
  | "zIndices"
> = {
  borders: {},
  breakpoints: {},
  colors: {},
  radii: {},
  shadows: {},
  sizes: {},
  space: {},
  transition: {
    duration: {},
    easing: {},
    property: {},
  },
  zIndices: {},
}

const typography: Pick<
  ChakraTheme,
  "letterSpacings" | "lineHeights" | "fontWeights" | "fonts" | "fontSizes"
> = {
  letterSpacings: {},
  lineHeights: {},
  fontWeights: {},
  fonts: {},
  fontSizes: {},
}

export const themeSkeleton: ChakraTheme = {
  ...foundations,
  ...typography,
  config,
  direction,
  components: {},
  styles: {
    global: {},
  },
}

export function createTheme(...args: any[]) {
  return extendTheme(...args, themeSkeleton)
}
