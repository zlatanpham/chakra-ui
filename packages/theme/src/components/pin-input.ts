import Input from "./input"
import { part } from "@chakra-ui/theme-tools"

type Dict = Record<string, any>

const baseStyle = {
  ...Input[part("Input", "field")],
  textAlign: "center",
}

const size = {
  lg: {
    fontSize: "lg",
    w: 12,
    h: 12,
    borderRadius: "md",
  },
  md: {
    fontSize: "md",
    w: 10,
    h: 10,
    borderRadius: "md",
  },
  sm: {
    fontSize: "sm",
    w: 8,
    h: 8,
    borderRadius: "sm",
  },
  xs: {
    fontSize: "xs",
    w: 6,
    h: 6,
    borderRadius: "sm",
  },
}

const variant = {
  outline: (props: Dict) => Input.variants.variant.outline(props).field,
  flushed: (props: Dict) => Input.variants.variant.flushed(props).field,
  filled: (props: Dict) => Input.variants.variant.filled(props).field,
  unstyled: Input.variants.variant.unstyled.field,
}

const defaultVariants = Input.defaultVariants

export default {
  ...baseStyle,
  variants: { variant, size },
  defaultVariants,
}
