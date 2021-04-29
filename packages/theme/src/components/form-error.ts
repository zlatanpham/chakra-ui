import { mode, part } from "@chakra-ui/theme-tools"

type Dict = Record<string, any>

function baseStyleText(props: Dict) {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm",
  }
}

function baseStyleIcon(props: Dict) {
  return {
    marginEnd: "0.5em",
    color: mode("red.500", "red.300")(props),
  }
}

const baseStyle = (props: Dict) => ({
  [part("FormError", "text")]: baseStyleText(props),
  [part("FormError", "icon")]: baseStyleIcon(props),
})

export default {
  baseStyle,
}
