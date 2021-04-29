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
import { useFormControlContext } from "./form-control"

export interface FormLabelProps
  extends HTMLChakraProps<"label">,
    ThemingProps<"FormLabel"> {
  /**
   * @type React.ReactElement
   */
  requiredIndicator?: React.ReactElement
}

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to inform users as to what information
 * is requested for a form field.
 *
 * ♿️ Accessibility: Every form field should have a form label.
 */
export const FormLabel = forwardRef<FormLabelProps, "label">(
  (passedProps, ref) => {
    const styles = useStyleConfig("FormLabel", passedProps)
    const props = omitThemingProps(passedProps)

    const {
      className,
      children,
      requiredIndicator = <RequiredIndicator />,
      ...rest
    } = props

    const field = useFormControlContext()

    return (
      <chakra.label
        {...field?.getLabelProps(rest, ref)}
        className={cx("chakra-form__label", props.className)}
        data-part="formlabel.label"
        __css={{
          display: "block",
          textAlign: "start",
          ...styles,
        }}
      >
        {children}
        {field?.isRequired ? requiredIndicator : null}
      </chakra.label>
    )
  },
)

if (__DEV__) {
  FormLabel.displayName = "FormLabel"
}

export interface RequiredIndicatorProps extends HTMLChakraProps<"span"> {}

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
export const RequiredIndicator = forwardRef<RequiredIndicatorProps, "span">(
  (props, ref) => {
    const field = useFormControlContext()

    if (!field?.isRequired) return null

    const className = cx("chakra-form__required-indicator", props.className)

    return (
      <chakra.span
        {...field?.getRequiredIndicatorProps(props, ref)}
        data-part="form.requiredIndicator"
        className={className}
      />
    )
  },
)

if (__DEV__) {
  RequiredIndicator.displayName = "RequiredIndicator"
}
