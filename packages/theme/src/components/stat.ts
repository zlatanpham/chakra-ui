import { part } from "@chakra-ui/theme-tools"

const baseStyleLabel = {
  fontWeight: "medium",
}

const baseStyleHelpText = {
  opacity: 0.8,
  marginBottom: 2,
}

const baseStyleNumber = {
  verticalAlign: "baseline",
  fontWeight: "semibold",
}

const baseStyleIcon = {
  marginEnd: 1,
  w: "14px",
  h: "14px",
  verticalAlign: "middle",
}

const baseStyle = {
  [part("Stat", "label").selector]: baseStyleLabel,
  [part("Stat", "helpText").selector]: baseStyleHelpText,
  [part("Stat", "number").selector]: baseStyleNumber,
  [part("Stat", "icon").selector]: baseStyleIcon,
}

const size = {
  md: {
    [part("Stat", "label").selector]: { fontSize: "sm" },
    [part("Stat", "helpText").selector]: { fontSize: "sm" },
    [part("Stat", "number").selector]: { fontSize: "2xl" },
  },
}

const defaultVariants = {
  size: "md",
}

export default {
  baseStyle,
  variants: { size },
  defaultVariants,
}
