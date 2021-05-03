import { mode, part } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

const baseStyle = {
  [part("Table", "table").selector]: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full",
  },
  [part("Table", "th").selector]: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "start",
  },
  [part("Table", "td").selector]: {
    textAlign: "start",
  },
  [part("Table", "caption").selector]: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium",
  },
}

const numericStyles = {
  "&[data-is-numeric=true]": {
    textAlign: "end",
  },
}

const simpleVariant = (props: ThemeComponentProps) => {
  const { colorScheme: c } = props

  return {
    [part("Table", "th").selector]: {
      color: mode(`gray.600`, `gray.400`)(props),
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    [part("Table", "td").selector]: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    [part("Table", "caption").selector]: {
      color: mode(`gray.600`, `gray.100`)(props),
    },
    [part("Table", "tfoot").selector]: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  }
}

const stripedVariant = (props: ThemeComponentProps) => {
  const { colorScheme: c } = props

  return {
    [part("Table", "th").selector]: {
      color: mode(`gray.600`, `gray.400`)(props),
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    [part("Table", "td").selector]: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    [part("Table", "caption").selector]: {
      color: mode(`gray.600`, `gray.100`)(props),
    },
    [part("Table", "tbody").selector]: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: mode(`${c}.100`, `${c}.700`)(props),
          },
          td: {
            background: mode(`${c}.100`, `${c}.700`)(props),
          },
        },
      },
    },
    [part("Table", "tfoot").selector]: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  }
}

const variant = {
  simple: simpleVariant,
  striped: stripedVariant,
  unstyled: {},
}

const size = {
  sm: {
    [part("Table", "th").selector]: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs",
    },
    [part("Table", "td").selector]: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4",
    },
    [part("Table", "caption").selector]: {
      px: "4",
      py: "2",
      fontSize: "xs",
    },
  },
  md: {
    [part("Table", "th").selector]: {
      px: "6",
      py: "3",
      lineHeight: "4",
      fontSize: "xs",
    },
    [part("Table", "td").selector]: {
      px: "6",
      py: "4",
      lineHeight: "5",
    },
    [part("Table", "caption").selector]: {
      px: "6",
      py: "2",
      fontSize: "sm",
    },
  },
  lg: {
    [part("Table", "th").selector]: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm",
    },
    [part("Table", "td").selector]: {
      px: "8",
      py: "5",
      lineHeight: "6",
    },
    [part("Table", "caption").selector]: {
      px: "6",
      py: "2",
      fontSize: "md",
    },
  },
}

const defaultVariants = {
  variant: "simple",
  size: "md",
  colorScheme: "gray",
}

export default {
  ...baseStyle,
  variants: { variant, size },
  defaultVariants,
}
