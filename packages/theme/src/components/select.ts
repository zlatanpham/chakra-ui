import { mode, scope } from "@chakra-ui/theme-tools"
import { mergeWith as merge } from "@chakra-ui/utils"
import Input from "./input"
import { ThemeComponentProps } from "../theme.types"

const parts = scope("select").parts("field", "icon")

function baseStyleField(props: ThemeComponentProps) {
  return {
    ...Input[parts.field],
    appearance: "none",
    paddingBottom: "1px",
    lineHeight: "normal",
    "> option, > optgroup": {
      bg: mode("white", "gray.700")(props),
    },
  }
}

const baseStyleIcon = {
  width: "1.5rem",
  height: "100%",
  insetEnd: "0.5rem",
  position: "relative",
  color: "currentColor",
  fontSize: "1.25rem",
  _disabled: {
    opacity: 0.5,
  },
}

const baseStyle = (props: ThemeComponentProps) => ({
  [parts.field]: baseStyleField(props),
  [parts.icon]: baseStyleIcon,
})

const sizes = merge({}, Input.variants.size, {
  xs: {
    [parts.icon]: {
      insetEnd: "0.25rem",
    },
  },
})

export default {
  baseStyle,
  variants: { ...Input.variants, sizes },
  defaultVariants: Input.defaultVariants,
}
