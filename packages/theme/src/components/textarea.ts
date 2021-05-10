import Input from "./input"
import { scope } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

const parts = scope("textarea").parts("field")

const baseStyle = {
  ...Input[parts.field],
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short",
}

const variant = {
  outline: (props: ThemeComponentProps) =>
    Input.variants.variant.outline(props)[parts.field],
  flushed: (props: ThemeComponentProps) =>
    Input.variants.variant.flushed(props)[parts.field],
  filled: (props: ThemeComponentProps) =>
    Input.variants.variant.filled(props)[parts.field],
  unstyled: Input.variants.variant.unstyled[parts.field],
}

const size = {
  xs: Input.variants.size.xs[parts.field],
  sm: Input.variants.size.sm[parts.field],
  md: Input.variants.size.md[parts.field],
  lg: Input.variants.size.lg[parts.field],
}

const defaultVariants = {
  size: "md",
  variant: "outline",
}

export default {
  ...baseStyle,
  variants: {
    variant,
    size,
  },
  defaultVariants,
}
