import { part } from "@chakra-ui/theme-tools"

const baseStyleLink = {
  transition: "all 0.15s ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline",
  },
  _focus: {
    boxShadow: "outline",
  },
}

const baseStyle = {
  [part("Badge", "link").selector]: baseStyleLink,
}

export default {
  ...baseStyle,
}
