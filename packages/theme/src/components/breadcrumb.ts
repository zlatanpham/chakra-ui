import { scope } from "@chakra-ui/theme-tools"
const parts = scope("breadcrumb").parts("link")

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
  [parts.link]: baseStyleLink,
}

export default {
  ...baseStyle,
}
