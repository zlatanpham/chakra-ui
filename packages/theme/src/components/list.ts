import { part } from "@chakra-ui/theme-tools"

const baseStyleContainer = {}

const baseStyleItem = {}

const baseStyleIcon = {
  marginEnd: "0.5rem",
  display: "inline",
  verticalAlign: "text-bottom",
}

const baseStyle = {
  [part("List", "container")]: baseStyleContainer,
  [part("List", "item")]: baseStyleItem,
  [part("List", "icon")]: baseStyleIcon,
}

export default {
  ...baseStyle,
}
