import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { scope } from "@chakra-ui/theme-tools"

const parts = scope("table").parts(
  "table",
  "tbody",
  "tr",
  "th",
  "td",
  "tfoot",
  "caption",
)

export interface TableContainerProps extends HTMLChakraProps<"div"> {}

export const TableContainer = forwardRef<TableContainerProps, "div">(
  (props: HTMLChakraProps<"div">, ref) => {
    const { overflow, overflowX, className, ...rest } = props
    return (
      <chakra.div
        ref={ref}
        className={cx("chakra-table__container", className)}
        {...rest}
        __css={{
          display: "block",
          whiteSpace: "nowrap",
          WebkitOverflowScrolling: "touch",
          overflowX: overflow ?? overflowX ?? "auto",
          overflowY: "hidden",
          maxWidth: "100%",
        }}
      />
    )
  },
)

export interface TableProps
  extends HTMLChakraProps<"table">,
    ThemingProps<"Table"> {}

export const Table = forwardRef<TableProps, "table">((props, ref) => {
  const styles = useStyleConfig("Table", props)
  const { className, ...tableProps } = omitThemingProps(props)

  return (
    <chakra.table
      {...parts.table.attrs}
      role="table"
      ref={ref}
      __css={styles}
      className={cx("chakra-table", className)}
      {...tableProps}
    />
  )
})

if (__DEV__) {
  Table.displayName = "Table"
}

export interface TableCaptionProps extends HTMLChakraProps<"caption"> {
  /**
   * The placement of the table caption. This sets the `caption-side` CSS attribute.
   * @default "bottom"
   */
  placement?: "top" | "bottom"
}

export const TableCaption = forwardRef<TableCaptionProps, "caption">(
  (props, ref) => {
    const { placement = "bottom", ...rest } = props

    return (
      <chakra.caption
        {...rest}
        {...parts.caption.attrs}
        ref={ref}
        __css={{
          captionSide: placement,
        }}
      />
    )
  },
)

if (__DEV__) {
  TableCaption.displayName = "TableCaption"
}

export interface TableHeadProps extends HTMLChakraProps<"thead"> {}

export const Thead = forwardRef<TableHeadProps, "thead">(({ ...rest }, ref) => (
  <chakra.thead {...rest} ref={ref} {...parts.thead.attrs} />
))

export interface TableBodyProps extends HTMLChakraProps<"tbody"> {}

export const Tbody = forwardRef<TableBodyProps, "tbody">((props, ref) => (
  <chakra.tbody {...props} {...parts.tbody.attrs} ref={ref} />
))

export interface TableFooterProps extends HTMLChakraProps<"tfoot"> {}

export const Tfoot = forwardRef<TableFooterProps, "tfoot">((props, ref) => (
  <chakra.tfoot {...props} {...parts.tfoot.attrs} ref={ref} />
))

export interface TableColumnHeaderProps extends HTMLChakraProps<"th"> {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean
}
export const Th = forwardRef<TableColumnHeaderProps, "th">(
  ({ isNumeric, ...rest }, ref) => (
    <chakra.th
      {...rest}
      {...parts.th.attrs}
      ref={ref}
      data-is-numeric={isNumeric}
    />
  ),
)

export interface TableRowProps extends HTMLChakraProps<"tr"> {}
export const Tr = forwardRef<TableRowProps, "tr">((props, ref) => (
  <chakra.tr role="row" {...parts.tr.attrs} {...props} ref={ref} />
))

export interface TableCellProps extends HTMLChakraProps<"td"> {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean
}
export const Td = forwardRef<TableCellProps, "td">(
  ({ isNumeric, ...rest }, ref) => (
    <chakra.td
      role="gridcell"
      {...rest}
      {...parts.td.attrs}
      ref={ref}
      data-is-numeric={isNumeric}
    />
  ),
)
