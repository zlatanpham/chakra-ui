import { part } from "@chakra-ui/theme-tools"

const baseStylePreview = {
  borderRadius: "md",
  py: "3px",
  transition: "all 0.2s",
}

const baseStyleInput = {
  borderRadius: "md",
  py: "3px",
  transition: "all 0.2s",
  width: "full",
  _focus: { boxShadow: "outline" },
  _placeholder: { opacity: 0.6 },
}

const baseStyle = {
  [part("Editable", "preview")]: baseStylePreview,
  [part("Editable", "input")]: baseStyleInput,
}

export default {
  ...baseStyle,
}
