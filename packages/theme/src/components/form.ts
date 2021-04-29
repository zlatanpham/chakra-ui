import { mode, part } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

function baseStyleRequiredIndicator(props: ThemeComponentProps) {
  return {
    marginStart: 1,
    color: mode("red.500", "red.300")(props),
  }
}

function baseStyleHelperText(props: ThemeComponentProps) {
  return {
    mt: 2,
    color: mode("gray.500", "whiteAlpha.600")(props),
    lineHeight: "normal",
    fontSize: "sm",
  }
}

const baseStyle = (props: ThemeComponentProps) => ({
  [part("Form", "requiredIndicator")]: baseStyleRequiredIndicator(props),
  [part("Form", "helperText")]: baseStyleHelperText(props),
})

export default {
  baseStyle,
}
