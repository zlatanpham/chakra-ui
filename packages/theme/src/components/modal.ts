import { mode, scope } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

const parts = scope("modal").parts(
  "overlay",
  "dialogContainer",
  "dialog",
  "header",
  "closeButton",
  "body",
  "footer",
)

const baseStyleOverlay = {
  bg: "blackAlpha.600",
  zIndex: "modal",
}

function baseStyleDialogContainer(props: ThemeComponentProps) {
  const { isCentered, scrollBehavior } = props

  return {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "flex-start",
    overflow: scrollBehavior === "inside" ? "hidden" : "auto",
  }
}

function baseStyleDialog(props: ThemeComponentProps) {
  const { scrollBehavior } = props

  return {
    borderRadius: "md",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    my: "3.75rem",
    zIndex: "modal",
    maxH: scrollBehavior === "inside" ? "calc(100% - 7.5rem)" : undefined,
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

function baseStyleBody(props: ThemeComponentProps) {
  const { scrollBehavior } = props
  return {
    px: 6,
    py: 2,
    flex: 1,
    overflow: scrollBehavior === "inside" ? "auto" : undefined,
  }
}

const baseStyleFooter = {
  px: 6,
  py: 4,
}

const baseStyle = (props: ThemeComponentProps) => ({
  [parts.overlay]: baseStyleOverlay,
  [parts.dialogContainer]: baseStyleDialogContainer(props),
  [parts.dialog]: baseStyleDialog(props),
  [parts.header]: baseStyleHeader,
  [parts.closeButton]: baseStyleCloseButton,
  [parts.body]: baseStyleBody(props),
  [parts.footer]: baseStyleFooter,
})

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string) {
  if (value === "full") {
    return {
      [parts.dialog]: { maxW: "100vw", minH: "100vh" },
    }
  }
  return { [parts.dialog]: { maxW: value } }
}

const size = {
  xs: getSize("xs"),
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg"),
  xl: getSize("xl"),
  "2xl": getSize("2xl"),
  "3xl": getSize("3xl"),
  "4xl": getSize("4xl"),
  "5xl": getSize("5xl"),
  "6xl": getSize("6xl"),
  full: getSize("full"),
}

const defaultVariants = {
  size: "md",
}

export default {
  baseStyle,
  variants: {
    size,
  },
  defaultVariants,
}
