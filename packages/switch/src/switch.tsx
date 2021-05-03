import { useCheckbox, UseCheckboxProps } from "@chakra-ui/checkbox"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
  SystemProps,
} from "@chakra-ui/system"
import { cx, dataAttr, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { part } from "@chakra-ui/theme-tools"

export interface SwitchProps
  extends Omit<UseCheckboxProps, "isIndeterminate">,
    Omit<HTMLChakraProps<"label">, keyof UseCheckboxProps>,
    ThemingProps<"Switch"> {
  /**
   * The spacing between the switch and its label text
   * @default 0.5rem
   * @type SystemProps["marginLeft"]
   */
  spacing?: SystemProps["marginLeft"]
}

export const Switch = forwardRef<SwitchProps, "input">((props, ref) => {
  const styles = useStyleConfig("Switch", props)

  const { spacing = "0.5rem", children, ...ownProps } = omitThemingProps(props)

  const {
    state,
    getInputProps,
    getCheckboxProps,
    getRootProps,
    getLabelProps,
  } = useCheckbox(ownProps)

  const containerStyles: SystemStyleObject = React.useMemo(
    () => ({
      display: "inline-block",
      verticalAlign: "middle",
      lineHeight: "normal",
      ...styles,
    }),
    [styles],
  )

  const trackStyles: SystemStyleObject = React.useMemo(
    () => ({
      display: "inline-flex",
      flexShrink: 0,
      justifyContent: "flex-start",
      boxSizing: "content-box",
      cursor: "pointer",
    }),
    [],
  )

  const labelStyles: SystemStyleObject = React.useMemo(
    () => ({
      userSelect: "none",
      marginStart: spacing,
    }),
    [spacing],
  )

  return (
    <chakra.label
      {...getRootProps()}
      className={cx("chakra-switch", props.className)}
      {...part("Switch", "container").attributes}
      __css={containerStyles}
    >
      <input
        className="chakra-switch__input"
        {...part("Switch", "input").attributes}
        {...getInputProps({}, ref)}
      />
      <chakra.span
        {...getCheckboxProps()}
        className="chakra-switch__track"
        {...part("Switch", "track").attributes}
        __css={trackStyles}
      >
        <chakra.span
          __css={styles.thumb}
          className="chakra-switch__thumb"
          {...part("Switch", "thumb").attributes}
          data-checked={dataAttr(state.isChecked)}
          data-hover={dataAttr(state.isHovered)}
        />
      </chakra.span>
      {children && (
        <chakra.span
          className="chakra-switch__label"
          {...part("Switch", "label").attributes}
          {...getLabelProps()}
          __css={labelStyles}
        >
          {children}
        </chakra.span>
      )}
    </chakra.label>
  )
})

if (__DEV__) {
  Switch.displayName = "Switch"
}
