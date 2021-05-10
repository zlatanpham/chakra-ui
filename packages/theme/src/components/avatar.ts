import { isDark, mode, randomColor, scope } from "@chakra-ui/theme-tools"
import themeSizes from "../foundations/sizes"
import { ThemeComponentProps } from "../theme.types"

const parts = scope("avatar").parts(
  "container",
  "badge",
  "excessLabel",
  "label",
  "group",
)

function baseStyleBadge(props: ThemeComponentProps) {
  return {
    transform: "translate(25%, 25%)",
    borderRadius: "full",
    border: "0.2em solid",
    borderColor: mode("white", "gray.800")(props),
  }
}

function baseStyleExcessLabel(props: ThemeComponentProps) {
  return {
    bg: mode("gray.200", "whiteAlpha.400")(props),
  }
}

function baseStyleContainer(props: ThemeComponentProps) {
  const { name, theme } = props
  const bg = name ? randomColor({ string: name }) : "gray.400"
  const isBgDark = isDark(bg)(theme)

  let color = "white"
  if (!isBgDark) color = "gray.800"

  const borderColor: string = mode("white", "gray.800")(props)

  return {
    bg,
    color,
    borderColor,
    verticalAlign: "top",
  }
}

const baseStyle = (props: ThemeComponentProps) => ({
  [parts.container]: baseStyleContainer(props),
  [parts.badge]: baseStyleBadge(props),
  [parts.excessLabel]: baseStyleExcessLabel(props),
})

function getSize(size: string) {
  const themeSize = themeSizes[size]
  return {
    width: size,
    height: size,
    fontSize: `calc(${themeSize ?? size} / 2.5)`,
    [parts.label]: {
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
