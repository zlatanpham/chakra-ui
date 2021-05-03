import { mode, part } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

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
  [part("FormError", "text").selector]: baseStyleText(props),
  [part("FormError", "icon").selector]: baseStyleIcon(props),
})

export default {
  baseStyle,
}
