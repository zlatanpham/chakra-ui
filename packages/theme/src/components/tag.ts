import Badge from "./badge"
import { ThemeComponentProps } from "../theme.types"
import { part } from "@chakra-ui/theme-tools"

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
  [part("Tag", "container").selector]: baseStyleContainer,
  [part("Tag", "label").selector]: baseStyleLabel,
  [part("Tag", "closeButton").selector]: baseStyleCloseButton,
}

const size = {
  sm: {
    [part("Tag", "container").selector]: {
      minH: "1.25rem",
      minW: "1.25rem",
      fontSize: "xs",
      px: 2,
      borderRadius: "md",
    },
    [part("Tag", "closeButton").selector]: {
      marginEnd: "-2px",
      marginStart: "0.35rem",
    },
  },
  md: {
    [part("Tag", "container").selector]: {
      minH: "1.5rem",
      minW: "1.5rem",
      fontSize: "sm",
      borderRadius: "md",
      px: 2,
    },
  },
  lg: {
    [part("Tag", "container").selector]: {
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
    [part("Tag", "container").selector]: Badge.variants.variant.subtle(props),
  }),
  solid: (props: ThemeComponentProps) => ({
    [part("Tag", "container").selector]: Badge.variants.variant.solid(props),
  }),
  outline: (props: ThemeComponentProps) => ({
    [part("Tag", "container").selector]: Badge.variants.variant.outline(props),
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
