import { isDark, mode, part, randomColor } from "@chakra-ui/theme-tools"
import themeSizes from "../foundations/sizes"
import { get } from "@chakra-ui/utils"

function baseStyleExcessLabel(props: Record<string, any>) {
  return {
    bg: mode("gray.200", "whiteAlpha.400")(props),
  }
}

const baseStyle = (props: Record<string, any>) => ({
  [part("Avatar", "excessLabel")]: baseStyleExcessLabel(props),
})

function getSize(size: string) {
  const themeSize = get(themeSizes, size)
  return {
    [part("Avatar", "excessLabel")]: {
      width: size,
      height: size,
    },
    [part("Avatar", "label")]: {
      fontSize: `calc(${themeSize ?? size} / 2.5)`,
      lineHeight: size !== "100%" ? themeSize ?? size : undefined,
    },
  }
}

const size = {
  "2xs": getSize("4"),
  xs: getSize("6"),
  sm: getSize("8"),
  md: getSize("12"),
  lg: getSize("16"),
  xl: getSize("24"),
  "2xl": getSize("32"),
  full: getSize("100%"),
}

const defaultVariants = {
  size: "md",
}

export default {
  baseStyle,
  variants: {
    size,
  },
  defaultVariants,
}
