import Checkbox from "./checkbox"
import { ThemeComponentProps } from "../theme.types"
import { part } from "@chakra-ui/theme-tools"

function baseStyleControl(props: ThemeComponentProps) {
  const control = Checkbox.baseStyle(props)[
    part("Checkbox", "control").selector
  ]

  return {
    ...control,
    borderRadius: "full",
    _checked: {
      ...control?.["_checked"],
      _before: {
        content: `""`,
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "currentColor",
      },
    },
  }
}

const baseStyle = (props: ThemeComponentProps) => ({
  label: Checkbox.baseStyle(props).label,
  control: baseStyleControl(props),
})

const size = {
  md: {
    control: { w: 4, h: 4 },
    label: { fontSize: "md" },
  },
  lg: {
    control: { w: 5, h: 5 },
    label: { fontSize: "lg" },
  },
  sm: {
    control: { width: 3, height: 3 },
    label: { fontSize: "sm" },
  },
}

const defaultVariants = {
  size: "md",
  colorScheme: "blue",
}

export default {
  baseStyle,
  variants: { size },
  defaultVariants,
}
