import { part } from "@chakra-ui/theme-tools"

const baseStyleContainer = {
  borderTopWidth: "1px",
  borderColor: "inherit",
  _last: {
    borderBottomWidth: "1px",
  },
}

const baseStyleButton = {
  fontSize: "1rem",
  _focus: {
    boxShadow: "outline",
  },
  _hover: {
    bg: "blackAlpha.50",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  px: 4,
  py: 2,
}

const baseStylePanel = {
  pt: 2,
  px: 4,
  pb: 5,
}

const baseStyleIcon = {
  fontSize: "1.25em",
}

export default {
  [part("Accordion", "item").selector]: baseStyleContainer,
  [part("Accordion", "button").selector]: baseStyleButton,
  [part("Accordion", "panel").selector]: baseStylePanel,
  [part("Accordion", "icon").selector]: baseStyleIcon,
}
