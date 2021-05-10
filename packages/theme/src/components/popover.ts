import { mode, scope } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

const parts = scope("popover").parts(
  "popper",
  "content",
  "header",
  "body",
  "footer",
  "arrow",
)

const baseStylePopper = {
  zIndex: 10,
}

function baseStyleContent(props: ThemeComponentProps) {
  const bg = mode("white", "gray.700")(props)
  const shadowColor = mode("gray.200", "whiteAlpha.300")(props)
  return {
    "--popover-bg": `colors.${bg}`,
    bg: "var(--popover-bg)",
    "--popper-arrow-bg": "var(--popover-bg)",
    "--popper-arrow-shadow-color": `colors.${shadowColor}`,
    width: "xs",
    border: "1px solid",
    borderColor: "inherit",
    borderRadius: "md",
    boxShadow: "sm",
    zIndex: "inherit",
    _focus: {
      outline: 0,
      boxShadow: "outline",
    },
  }
}

const baseStyleHeader = {
  px: 3,
  py: 2,
  borderBottomWidth: "1px",
}

const baseStyleBody = {
  px: 3,
  py: 2,
}

const baseStyleFooter = {
  px: 3,
  py: 2,
  borderTopWidth: "1px",
}

const baseStyle = (props: ThemeComponentProps) => ({
  [parts.popper]: baseStylePopper,
  [parts.content]: baseStyleContent(props),
  [parts.header]: baseStyleHeader,
  [parts.body]: baseStyleBody,
  [parts.footer]: baseStyleFooter,
  [parts.arrow]: {},
})

export default {
  baseStyle,
}
