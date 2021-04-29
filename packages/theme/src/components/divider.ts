const baseStyle = {
  opacity: 0.6,
  borderColor: "inherit",
}

const variantSolid = {
  borderStyle: "solid",
}

const variantDashed = {
  borderStyle: "dashed",
}

const variant = {
  solid: variantSolid,
  dashed: variantDashed,
}

const defaultVariants = {
  variant: "solid",
}

export default {
  ...baseStyle,
  variants: {
    variant,
  },
  defaultVariants,
}
