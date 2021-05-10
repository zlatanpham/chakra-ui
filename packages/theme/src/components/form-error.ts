import { mode, scope } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

const parts = scope("formerror").parts("message", "icon")

function baseStyleText(props: ThemeComponentProps) {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm",
  }
}

function baseStyleIcon(props: ThemeComponentProps) {
  return {
    marginEnd: "0.5em",
    color: mode("red.500", "red.300")(props),
  }
}

const baseStyle = (props: ThemeComponentProps) => ({
  [parts.message]: baseStyleText(props),
  [parts.icon]: baseStyleIcon(props),
})

export default {
  baseStyle,
}
