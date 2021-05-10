import { mode, scope } from "@chakra-ui/theme-tools"
import Input from "./input"
import typography from "../foundations/typography"
import { ThemeComponentProps } from "../theme.types"

const parts = scope("numberinput").parts("field", "stepperGroup", "stepper")

const { variants, defaultVariants } = Input

const baseStyleRoot = {
  "--number-input-stepper-width": "24px",
  "--number-input-field-padding":
    "calc(var(--number-input-stepper-width) + 0.5rem)",
}

const inputFieldSelector = parts.field
const baseStyleField = Input[inputFieldSelector]

const baseStyleStepperGroup = {
  width: "var(--number-input-stepper-width)",
}

function baseStyleStepper(props: ThemeComponentProps) {
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

const baseStyle = (props: ThemeComponentProps) => ({
  ...baseStyleRoot,
  [parts.field]: baseStyleField,
  [parts.stepperGroup]: baseStyleStepperGroup,
  [parts.stepper]: baseStyleStepper(props),
})

function getSize(size: "xs" | "sm" | "md" | "lg") {
  const sizeStyle = Input.variants.size[size]

  const radius = {
    lg: "md",
    md: "md",
    sm: "sm",
    xs: "sm",
  }

  const resolvedFontSize = typography.fontSizes[sizeStyle?.fontSize?.fontSize]

  return {
    [parts.field]: {
      ...sizeStyle[inputFieldSelector],
      paddingInlineEnd: "var(--number-input-field-padding)",
      verticalAlign: "top",
    },
    [parts.stepper]: {
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
