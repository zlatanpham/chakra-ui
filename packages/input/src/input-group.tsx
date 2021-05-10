import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { getValidChildren } from "@chakra-ui/react-utils"
import * as React from "react"
import { scope } from "@chakra-ui/theme-tools"

const parts = scope("input").parts("addon", "field", "element")

export interface InputGroupProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Input"> {}

export const InputGroup = forwardRef<InputGroupProps, "div">((props, ref) => {
  const styles = useStyleConfig("Input", props)
  const { children, className, ...rest } = omitThemingProps(props)

  const _className = cx("chakra-input__group", className)
  const groupStyles: InputGroupProps = {}

  const validChildren = getValidChildren(children)

  validChildren.forEach((child: any) => {
    if (!styles) return

    if (styles && child.type.id === "InputLeftElement") {
      groupStyles.paddingStart = styles.height ?? styles.h
    }

    if (styles && child.type.id === "InputRightElement") {
      groupStyles.paddingEnd = styles.height ?? styles.h
    }

    if (child.type.id === "InputRightAddon") {
      groupStyles.borderEndRadius = 0
    }

    if (child.type.id === "InputLeftAddon") {
      groupStyles.borderStartRadius = 0
    }
  })

  const clones = validChildren.map((child: any) => {
    /**
     * Make it possible to override the size and variant from `Input`
     */
    const theming = {
      size: child.props?.size || props.size,
      variant: child.props?.variant || props.variant,
    }

    return child.type.id !== "Input"
      ? React.cloneElement(child, theming)
      : React.cloneElement(
          child,
          Object.assign(theming, groupStyles, child.props),
        )
  })

  return (
    <chakra.div
      className={_className}
      ref={ref}
      __css={{
        width: "100%",
        display: "flex",
        position: "relative",
        ...styles,
      }}
      {...parts.group.attrs}
      {...rest}
    >
      {clones}
    </chakra.div>
  )
})

if (__DEV__) {
  InputGroup.displayName = "InputGroup"
}
