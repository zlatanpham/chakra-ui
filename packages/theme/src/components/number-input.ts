import { mode, part } from "@chakra-ui/theme-tools"
import Input from "./input"
import typography from "../foundations/typography"

const { variants, defaultVariants } = Input

const baseStyleRoot = {
  "--number-input-stepper-width": "24px",
  "--number-input-field-padding":
    "calc(var(--number-input-stepper-width) + 0.5rem)",
}

const inputFieldPart = part("Input", "field")
const baseStyleField = Input[inputFieldPart]

const baseStyleStepperGroup = {
  width: "var(--number-input-stepper-width)",
}

function baseStyleStepper(props: Record<string, any>) {
  return {
    borderStart: "1px solid",
    borderStartColor: mode("inherit", "whiteAlpha.300")(props),
    color: mode("inherit", "whiteAlpha.800")(props),
    _active: {
      bg: mode("gray.200", "whiteAlpha.300")(props),
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  }
}

const baseStyle = (props: Record<string, any>) => ({
  ...baseStyleRoot,
  [part("NumberInput", "field")]: baseStyleField,
  [part("NumberInput", "stepperGroup")]: baseStyleStepperGroup,
  [part("NumberInput", "stepper")]: baseStyleStepper(props),
})

function getSize(size: "xs" | "sm" | "md" | "lg") {
  const sizeStyle = Input.variants.size[size]

  const radius = {
    lg: "md",
    md: "md",
    sm: "sm",
    xs: "sm",
  }
  console.log(sizeStyle)
  const resolvedFontSize = typography.fontSizes[sizeStyle.fontSize]

  return {
    [part("NumberInput", "field")]: {
      ...sizeStyle[inputFieldPart],
      paddingInlineEnd: "var(--number-input-field-padding)",
      verticalAlign: "top",
    },
    [part("NumberInput", "stepper")]: {
      fontSize: `calc(${resolvedFontSize} * 0.75)`,
      _first: {
        borderTopEndRadius: radius[size],
      },
      _last: {
        borderBottomEndRadius: radius[size],
        mt: "-1px",
        borderTopWidth: 1,
      },
    },
  }
}

const size = {
  xs: getSize("xs"),
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg"),
}

export default {
  baseStyle,
  variants: { ...variants, size },
  defaultVariants,
}
