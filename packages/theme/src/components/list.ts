import { scope } from "@chakra-ui/theme-tools"

const parts = scope("list").parts("container", "item", "icon")

const baseStyleContainer = {}

const baseStyleItem = {}

const baseStyleIcon = {
  marginEnd: "0.5rem",
  display: "inline",
  verticalAlign: "text-bottom",
}

const baseStyle = {
  [parts.container]: baseStyleContainer,
  [parts.item]: baseStyleItem,
  [parts.icon]: baseStyleIcon,
}

export default {
  ...baseStyle,
}
