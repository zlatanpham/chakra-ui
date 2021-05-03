import { mode, part } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

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
  [part("Popover", "popper").selector]: baseStylePopper,
  [part("Popover", "content").selector]: baseStyleContent(props),
  [part("Popover", "header").selector]: baseStyleHeader,
  [part("Popover", "body").selector]: baseStyleBody,
  [part("Popover", "footer").selector]: baseStyleFooter,
  [part("Popover", "arrow").selector]: {},
})

export default {
  baseStyle,
}
