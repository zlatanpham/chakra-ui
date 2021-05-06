import {
  css,
  isStyleProp,
  StyleProps,
  SystemStyleObject,
} from "@chakra-ui/styled-system"
import { objectFilter } from "@chakra-ui/utils"
import _styled, { CSSObject, FunctionInterpolation } from "@emotion/styled"
import { shouldForwardProp as defaultShouldForwardProp } from "./should-forward-prop"
import { As, ChakraComponent, ChakraProps, PropsOf } from "./system.types"
import { domElements, DOMElements } from "./system.utils"

type StyleResolverProps = SystemStyleObject & {
  "data-part"?: string
  __css?: SystemStyleObject
  sx?: SystemStyleObject
  theme: any
  css?: CSSObject
}

interface GetStyleObject {
  (options: {
    baseStyle?: SystemStyleObject
  }): FunctionInterpolation<StyleResolverProps>
}

/**
 * Style resolver function that manages how style props are merged
 * in combination with other possible ways of defining styles.
 *
 * For example, take a component defined this way:
 * ```jsx
 * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
 * ```
 *
 * We want to manage the priority of the styles properly to prevent unwanted
 * behaviors. Right now, the `sx` prop has the highest priority so the resolved
 * fontSize will be `40px`
 */
export const toCSSObject: GetStyleObject = ({ baseStyle }) => (props) => {
  const {
    theme,
    css: cssProp,
    __css,
    sx,
    "data-part": dataPart,
    ...rest
  } = props
  const styleProps = objectFilter(rest, (_, prop) => isStyleProp(prop))

  const prioritySelector = "&&"
  const priorityStyles = {
    [prioritySelector]: Object.assign({}, styleProps, sx),
  }
  const styles = Object.assign({}, __css, baseStyle, priorityStyles)

  const computedCSS = css(styles)(props.theme)
  return cssProp ? [computedCSS, cssProp] : computedCSS
}

type StyledOptions = SystemStyleObject & {
  shouldForwardProp?(prop: string): boolean
  label?: string
  baseStyle?: SystemStyleObject
}

export function styled<T extends As, P = {}>(
  component: T,
  options?: StyledOptions,
) {
  const {
    label,
    baseStyle,
    shouldForwardProp = defaultShouldForwardProp,
    ...styledOptions
  } = options ?? {
    shouldForwardProp: undefined,
  }

  const styleObject = toCSSObject({
    baseStyle: { baseStyle, ...styledOptions },
  })

  const emotionOptions = {
    shouldForwardProp,
    ...styledOptions,
  }

  return _styled(
    component as React.ComponentType<any>,
    emotionOptions,
  )(styleObject) as ChakraComponent<T, P>
}

export type HTMLChakraComponents = {
  [Tag in DOMElements]: ChakraComponent<Tag, {}>
}

export type HTMLChakraProps<T extends As> = Omit<
  PropsOf<T>,
  T extends "svg"
    ? "ref" | "children" | keyof StyleProps
    : "ref" | keyof StyleProps
> &
  ChakraProps & { as?: As }

type ChakraFactory = {
  <T extends As, P = {}>(
    component: T,
    options?: StyledOptions,
  ): ChakraComponent<T, P>
}

export const chakra = (styled as unknown) as ChakraFactory &
  HTMLChakraComponents

domElements.forEach((tag) => {
  chakra[tag] = chakra(tag)
})
