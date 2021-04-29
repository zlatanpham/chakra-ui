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
  [part("Stat", "label")]: baseStyleLabel,
  [part("Stat", "helpText")]: baseStyleHelpText,
  [part("Stat", "number")]: baseStyleNumber,
  [part("Stat", "icon")]: baseStyleIcon,
}

const size = {
  md: {
    [part("Stat", "label")]: { fontSize: "sm" },
    [part("Stat", "helpText")]: { fontSize: "sm" },
    [part("Stat", "number")]: { fontSize: "2xl" },
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
