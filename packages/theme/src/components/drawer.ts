import { mode, scope } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

const parts = scope("drawer").parts(
  "overlay",
  "dialogContainer",
  "dialog",
  "header",
  "closeButton",
  "body",
  "footer",
)

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string) {
  if (value === "full") {
    return {
      [parts.dialog]: { maxW: "100vw", h: "100vh" },
    }
  }
  return { [parts.dialog]: { maxW: value } }
}

const baseStyleOverlay = {
  bg: "blackAlpha.600",
  zIndex: "overlay",
}

const baseStyleDialogContainer = {
  display: "flex",
  zIndex: "modal",
  justifyContent: "center",
}

function baseStyleDialog(props: ThemeComponentProps) {
  const { isFullHeight } = props

  return {
    ...(isFullHeight && { height: "100vh" }),
    zIndex: "modal",
    maxH: "100vh",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    boxShadow: mode("lg", "dark-lg")(props),
  }
}

const baseStyleHeader = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold",
}

const baseStyleCloseButton = {
  position: "absolute",
  top: 2,
  insetEnd: 3,
}

const baseStyleBody = {
  px: 6,
  py: 2,
  flex: 1,
  overflow: "auto",
}

const baseStyleFooter = {
  px: 6,
  py: 4,
}

const baseStyle = (props: ThemeComponentProps) => ({
  [parts.overlay]: baseStyleOverlay,
  [parts.dialogContainer]: baseStyleDialogContainer,
  [parts.dialog]: baseStyleDialog(props),
  [parts.header]: baseStyleHeader,
  [parts.closeButton]: baseStyleCloseButton,
  [parts.body]: baseStyleBody,
  [parts.footer]: baseStyleFooter,
})

const size = {
  xs: getSize("xs"),
  sm: getSize("md"),
  md: getSize("lg"),
  lg: getSize("2xl"),
  xl: getSize("4xl"),
  full: getSize("full"),
}

const defaultVariants = {
  size: "xs",
}

export default {
  ...baseStyle,
  variants: {
    size,
  },
  defaultVariants,
}
