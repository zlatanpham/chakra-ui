import { mode, scope } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

const parts = scope("checkbox").parts("control", "icon", "label", "input")

function baseStyleControl(props: ThemeComponentProps) {
  const { colorScheme: c } = props

  return {
    w: "100%",
    transition: "box-shadow 250ms",
    border: "2px solid",
    borderRadius: "sm",
    borderColor: "inherit",
    color: "white",

    _checked: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      color: mode("white", "gray.900")(props),

      _hover: {
        bg: mode(`${c}.600`, `${c}.300`)(props),
        borderColor: mode(`${c}.600`, `${c}.300`)(props),
      },

      _disabled: {
        borderColor: mode("gray.200", "transparent")(props),
        bg: mode("gray.200", "whiteAlpha.300")(props),
        color: mode("gray.500", "whiteAlpha.500")(props),
      },
    },

    _indeterminate: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      color: mode("white", "gray.900")(props),
    },

    _disabled: {
      bg: mode("gray.100", "whiteAlpha.100")(props),
      borderColor: mode("gray.100", "transparent")(props),
    },

    _focus: {
      boxShadow: "outline",
    },

    _invalid: {
      borderColor: mode("red.500", "red.300")(props),
    },
  }
}

const baseStyleLabel = {
  userSelect: "none",
  _disabled: { opacity: 0.4 },
}

const baseStyle = (props: ThemeComponentProps) => ({
  [parts.control]: baseStyleControl(props),
  [parts.label]: baseStyleLabel,
})

const size = {
  sm: {
    [parts.control]: { h: 3, w: 3 },
    [parts.label]: { fontSize: "sm" },
    [parts.icon]: { fontSize: "0.45rem" },
  },
  md: {
    [parts.control]: { w: 4, h: 4 },
    [parts.label]: { fontSize: "md" },
    [parts.icon]: { fontSize: "0.625rem" },
  },
  lg: {
    [parts.control]: { w: 5, h: 5 },
    [parts.label]: { fontSize: "lg" },
    [parts.icon]: { fontSize: "0.625rem" },
  },
}

const defaultVariants = {
  size: "md",
  colorScheme: "blue",
}

export default {
  baseStyle,
  variants: { size },
  defaultVariants,
}
