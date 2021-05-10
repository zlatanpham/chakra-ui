import { mode, scope } from "@chakra-ui/theme-tools"
import { ThemeComponentProps } from "../theme.types"

const parts = scope("table").parts(
  "table",
  "tbody",
  "tr",
  "th",
  "td",
  "tfoot",
  "caption",
)

const baseStyle = {
  [parts.table]: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full",
  },
  [parts.th]: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "start",
  },
  [parts.td]: {
    textAlign: "start",
  },
  [parts.caption]: {
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
    [parts.th]: {
      color: mode(`gray.600`, `gray.400`)(props),
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    [parts.td]: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    [parts.caption]: {
      color: mode(`gray.600`, `gray.100`)(props),
    },
    [parts.tfoot]: {
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
    [parts.th]: {
      color: mode(`gray.600`, `gray.400`)(props),
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    [parts.td]: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    [parts.caption]: {
      color: mode(`gray.600`, `gray.100`)(props),
    },
    [parts.tbody]: {
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
    [parts.tfoot]: {
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
    [parts.th]: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs",
    },
    [parts.td]: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4",
    },
    [parts.caption]: {
      px: "4",
      py: "2",
      fontSize: "xs",
    },
  },
  md: {
    [parts.th]: {
      px: "6",
      py: "3",
      lineHeight: "4",
      fontSize: "xs",
    },
    [parts.td]: {
      px: "6",
      py: "4",
      lineHeight: "5",
    },
    [parts.caption]: {
      px: "6",
      py: "2",
      fontSize: "sm",
    },
  },
  lg: {
    [parts.th]: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm",
    },
    [parts.td]: {
      px: "8",
      py: "5",
      lineHeight: "6",
    },
    [parts.caption]: {
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
