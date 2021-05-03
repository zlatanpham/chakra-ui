import { part } from "@chakra-ui/theme-tools"

const baseStyleContainer = {}

const baseStyleItem = {}

const baseStyleIcon = {
  marginEnd: "0.5rem",
  display: "inline",
  verticalAlign: "text-bottom",
}

const baseStyle = {
  [part("List", "container").selector]: baseStyleContainer,
  [part("List", "item").selector]: baseStyleItem,
  [part("List", "icon").selector]: baseStyleIcon,
}

export default {
  ...baseStyle,
}
