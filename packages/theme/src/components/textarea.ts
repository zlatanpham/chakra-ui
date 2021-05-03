import Input from "./input"
import { part } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

const inputFieldPart = part("Input", "field").selector

const baseStyle = {
  ...Input[inputFieldPart],
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short",
}

const variant = {
  outline: (props: ThemeComponentProps) =>
    Input.variants.variant.outline(props)[inputFieldPart],
  flushed: (props: ThemeComponentProps) =>
    Input.variants.variant.flushed(props)[inputFieldPart],
  filled: (props: ThemeComponentProps) =>
    Input.variants.variant.filled(props)[inputFieldPart],
  unstyled: Input.variants.variant.unstyled[inputFieldPart],
}

const size = {
  xs: Input.variants.size.xs[inputFieldPart],
  sm: Input.variants.size.sm[inputFieldPart],
  md: Input.variants.size.md[inputFieldPart],
  lg: Input.variants.size.lg[inputFieldPart],
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
