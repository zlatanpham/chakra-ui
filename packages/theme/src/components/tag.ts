import Badge from "./badge"
import { ThemeComponentProps } from "../theme.types"
import { scope } from "@chakra-ui/theme-tools"

const parts = scope("tag").parts("container", "label", "closeButton")

const baseStyleContainer = {
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  _focus: {
    boxShadow: "outline",
  },
}

const baseStyleLabel = {
  lineHeight: 1.2,
}

const baseStyleCloseButton = {
  fontSize: "18px",
  w: "1.25rem",
  h: "1.25rem",
  borderRadius: "full",
  marginStart: "0.375rem",
  marginEnd: "-1",
  opacity: 0.5,
  _disabled: {
    opacity: 0.4,
  },
  _focus: {
    boxShadow: "outline",
    bg: "rgba(0, 0, 0, 0.14)",
  },
  _hover: { opacity: 0.8 },
  _active: { opacity: 1 },
}

const baseStyle = {
  [parts.container]: baseStyleContainer,
  [parts.label]: baseStyleLabel,
  [parts.closeButton]: baseStyleCloseButton,
}

const size = {
  sm: {
    [parts.container]: {
      minH: "1.25rem",
      minW: "1.25rem",
      fontSize: "xs",
      px: 2,
      borderRadius: "md",
    },
    [parts.closeButton]: {
      marginEnd: "-2px",
      marginStart: "0.35rem",
    },
  },
  md: {
    [parts.container]: {
      minH: "1.5rem",
      minW: "1.5rem",
      fontSize: "sm",
      borderRadius: "md",
      px: 2,
    },
  },
  lg: {
    [parts.container]: {
      minH: 8,
      minW: 8,
      fontSize: "md",
      borderRadius: "md",
      px: 3,
    },
  },
}

const variant = {
  subtle: (props: ThemeComponentProps) => ({
    [parts.container]: Badge.variants.variant.subtle(props),
  }),
  solid: (props: ThemeComponentProps) => ({
    [parts.container]: Badge.variants.variant.solid(props),
  }),
  outline: (props: ThemeComponentProps) => ({
    [parts.container]: Badge.variants.variant.outline(props),
  }),
}

const defaultVariants = {
  size: "md",
  variant: "subtle",
  colorScheme: "gray",
}

export default {
  variants: { variant, size },
  baseStyle,
  defaultVariants,
}
