import {
  chakra,
  createMultiPartClassName,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

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
  const styles = useMultiStyleConfig("Table", props)
  const { className, ...tableProps } = omitThemingProps(props)

  return (
    <StylesProvider value={styles}>
      <chakra.table
        role="table"
        ref={ref}
        /**
         * Merge element styles with root styles which contains nested styles
         * with CSS classes for its sub components, like in the "old days":
         *
         * E.g. `.css-1cxjw3k .chakra-table__td { text-align: left }`
         *
         * Currently this would be a breaking change, because the style props
         * given to the sub components would not override the CSS properties
         * from the theme, because of their higher specificity.
         *
         * I think we could apply the styles for the sub components
         * differently, if the props contains a className.
         *
         * E.g. Given a component receives a className
         *   <chakra.td className="chakra-table__td" textAlign="right" />
         *
         * We could increase the specificity by concatinating the emotion class
         * with the sub component class.
         *
         * => <td __css={{ ['&.chakra-table__td']: { textAlign: 'right' } }} />
         *
         * I think this needs happen on the styled-system level.
         */
        __css={{ ...styles.root, ...styles.table }}
        className={cx("chakra-table", className)}
        {...tableProps}
      />
    </StylesProvider>
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
    const { placement = "bottom", className, ...rest } = props
    const styles = useStyles()
    return (
      <chakra.caption
        {...rest}
        className={cx(createMultiPartClassName("Table", "caption"), className)}
        ref={ref}
        __css={{
          ...styles.caption,
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

export const Thead = forwardRef<TableHeadProps, "thead">(
  ({ className, ...rest }, ref) => (
    <chakra.thead
      {...rest}
      ref={ref}
      className={cx(createMultiPartClassName("Table", "thead"), className)}
    />
  ),
)

export interface TableBodyProps extends HTMLChakraProps<"tbody"> {}

export const Tbody = forwardRef<TableBodyProps, "tbody">(
  ({ className, ...rest }, ref) => (
    <chakra.tbody
      {...rest}
      ref={ref}
      className={cx(createMultiPartClassName("Table", "tbody"), className)}
    />
  ),
)

export interface TableFooterProps extends HTMLChakraProps<"tfoot"> {}

export const Tfoot = forwardRef<TableFooterProps, "tfoot">(
  ({ className, ...rest }, ref) => (
    <chakra.tfoot
      {...rest}
      ref={ref}
      className={cx(createMultiPartClassName("Table", "tfoot"), className)}
    />
  ),
)

export interface TableColumnHeaderProps extends HTMLChakraProps<"th"> {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean
}
export const Th = forwardRef<TableColumnHeaderProps, "th">(
  ({ isNumeric, className, ...rest }, ref) => (
    <chakra.th
      {...rest}
      ref={ref}
      className={cx(createMultiPartClassName("Table", "th"), className)}
      data-is-numeric={isNumeric}
    />
  ),
)

export interface TableRowProps extends HTMLChakraProps<"tr"> {}
export const Tr = forwardRef<TableRowProps, "tr">(
  ({ className, ...rest }, ref) => (
    <chakra.tr
      role="row"
      {...rest}
      ref={ref}
      className={cx(createMultiPartClassName("Table", "tr"), className)}
    />
  ),
)

export interface TableCellProps extends HTMLChakraProps<"td"> {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean
}
export const Td = forwardRef<TableCellProps, "td">(
  ({ isNumeric, className, ...rest }, ref) => (
    <chakra.td
      role="gridcell"
      {...rest}
      ref={ref}
      className={cx(createMultiPartClassName("Table", "td"), className)}
      data-is-numeric={isNumeric}
    />
  ),
)
