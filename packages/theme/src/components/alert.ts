import { getColor, mode, part, transparentize } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

const baseStyle = {
  px: 4,
  py: 3,
  [part("Alert", "title")]: {
    fontWeight: "bold",
    lineHeight: 6,
    marginEnd: 2,
  },
  [part("Alert", "description")]: {
    lineHeight: 6,
  },
  [part("Alert", "icon")]: {
    flexShrink: 0,
    marginEnd: 3,
    w: 5,
    h: 6,
  },
}

function getBg(props: ThemeComponentProps) {
  const { theme, colorScheme: c } = props
  const lightBg = getColor(theme, `${c}.100`, c)
  const darkBg = transparentize(`${c}.200`, 0.16)(theme)
  return mode(lightBg, darkBg)(props)
}

function variantSubtle(props: ThemeComponentProps) {
  const { colorScheme: c } = props
  return {
    bg: getBg(props),
    [part("Alert", "icon")]: { color: mode(`${c}.500`, `${c}.200`)(props) },
  }
}

function variantLeftAccent(props: ThemeComponentProps) {
  const { colorScheme: c } = props
  return {
    paddingStart: 3,
    borderStartWidth: "4px",
    borderStartColor: mode(`${c}.500`, `${c}.200`)(props),
    bg: getBg(props),
    [part("Alert", "icon")]: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
}

function variantTopAccent(props: ThemeComponentProps) {
  const { colorScheme: c } = props
  return {
    pt: 2,
    borderTopWidth: "4px",
    borderTopColor: mode(`${c}.500`, `${c}.200`)(props),
    bg: getBg(props),
    [part("Alert", "icon")]: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
}

function variantSolid(props: ThemeComponentProps) {
  const { colorScheme: c } = props
  return {
    bg: mode(`${c}.500`, `${c}.200`)(props),
    color: mode(`white`, `gray.900`)(props),
  }
}

const variant = {
  subtle: variantSubtle,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid,
}

const defaultVariants = {
  variant: "subtle",
  colorScheme: "blue",
}

export default {
  ...baseStyle,
  variants: {
    variant,
  },
  defaultVariants,
}
