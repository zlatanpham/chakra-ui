import { mode, part } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

function baseStyleTrack(props: ThemeComponentProps) {
  const { colorScheme: c } = props

  return {
    borderRadius: "full",
    p: "2px",
    width: "var(--slider-track-width)",
    height: "var(--slider-track-height)",
    transition: "all 120ms",
    bg: mode("gray.300", "whiteAlpha.400")(props),
    _focus: {
      boxShadow: "outline",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    _checked: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
}

const baseStyleThumb = {
  bg: "white",
  transition: "transform 250ms",
  borderRadius: "inherit",
  width: "var(--slider-track-height)",
  height: "var(--slider-track-height)",
  _checked: {
    transform: "translateX(var(--slider-thumb-x))",
  },
}

const baseStyle = (props: ThemeComponentProps) => ({
  [part("Switch", "container").selector]: {
    "--slider-track-diff":
      "calc(var(--slider-track-width) - var(--slider-track-height))",
    "--slider-thumb-x": "var(--slider-track-diff)",
    _rtl: {
      "--slider-thumb-x": "calc(-1 * var(--slider-track-diff))",
    },
  },
  [part("Switch", "track").selector]: baseStyleTrack(props),
  [part("Switch", "thumb").selector]: baseStyleThumb,
})

const size = {
  sm: {
    [part("Switch", "container").selector]: {
      "--slider-track-width": "1.375rem",
      "--slider-track-height": "0.75rem",
    },
  },
  md: {
    [part("Switch", "container").selector]: {
      "--slider-track-width": "1.875rem",
      "--slider-track-height": "1rem",
    },
  },
  lg: {
    [part("Switch", "container").selector]: {
      "--slider-track-width": "2.875rem",
      "--slider-track-height": "1.5rem",
    },
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
