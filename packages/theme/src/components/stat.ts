import { scope } from "@chakra-ui/theme-tools"

const parts = scope("stat").parts("label", "helpText", "number", "icon")

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
  [parts.label]: baseStyleLabel,
  [parts.helpText]: baseStyleHelpText,
  [parts.number]: baseStyleNumber,
  [parts.icon]: baseStyleIcon,
}

const size = {
  md: {
    [parts.label]: { fontSize: "sm" },
    [parts.helpText]: { fontSize: "sm" },
    [parts.number]: { fontSize: "2xl" },
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
