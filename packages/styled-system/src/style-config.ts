import {
  AnalyzeBreakpointsReturn,
  Dict,
  filterUndefined,
  isDefined,
  isNumeric,
  isObject,
  mergeWith,
  runIfFn,
} from "@chakra-ui/utils"
import { CSSObject, StyleObjectOrFn } from "./types"
import { ResponsiveValue } from "./utils"
import { ColorMode } from "@chakra-ui/color-mode"

type Thunk<T, Args extends any[] = []> = T | ((...args: Args) => T)

export interface StyleConfigThemingProps extends Dict {
  theme: Dict
  colorMode: ColorMode

  variant?: ResponsiveValue<string>
  size?: ResponsiveValue<string>
  colorScheme?: string
  styleConfig?: StyleConfigOptions
  children?: unknown
}

export type ThemeComponentThunk = Thunk<
  StyleObjectOrFn,
  [StyleConfigThemingProps]
>
export type VariantConfig = Record<string, ThemeComponentThunk>
export type Variants = Partial<Record<string & {}, VariantConfig>>

export type RightJoin<Left extends object, Right extends object> = Omit<
  Left,
  keyof Right
> &
  Right

export type StyleConfigOptions = RightJoin<
  CSSObject,
  {
    baseStyle?: ThemeComponentThunk
    variants?: Variants
    defaultVariants?: Record<keyof Variants, string>
  }
>

type BreakpointDetail = NonNullable<AnalyzeBreakpointsReturn>["details"]

function getResponsiveVariantStyles(
  variantConfig: VariantConfig,
  responsiveName: ResponsiveValue<string>,
  props: StyleConfigThemingProps,
) {
  const breakpointDetails: BreakpointDetail = props.theme.__breakpoints?.details
  if (!breakpointDetails) {
    return null
  }

  function findBreakpoint(key: string | number) {
    if (isNumeric(key)) {
      // key is an array index
      return breakpointDetails[key]
    }

    // key is the breakpoint name
    return breakpointDetails.find((bp) => bp.breakpoint === key)
  }

  if (!isObject(responsiveName) && !Array.isArray(responsiveName)) {
    return runIfFn(variantConfig[responsiveName], props)
  }

  // responsive prop is either in the object or array notation
  const result = Object.keys(responsiveName).map((key, index, all) => {
    const isLast = index === all.length - 1
    const value = responsiveName[key]
    const breakpoint = findBreakpoint(key)

    if (!breakpoint) {
      return null
    }

    const mediaQueryStyles = runIfFn(variantConfig[value], props)
    const mediaQuery = isLast ? breakpoint.minWQuery : breakpoint.minMaxQuery

    return {
      [mediaQuery]: mergeWith({}, mediaQueryStyles),
    }
  })

  return mergeWith({}, ...result)
}

function getAllVariantStyles(
  variants: Variants,
  props: StyleConfigThemingProps,
) {
  return Object.entries(variants)
    .map(
      ([
        /** @example `size` or `variant` */
        typeName,
        typeConfig,
      ]) => {
        if (!typeConfig) {
          // skip empty definitions
          return null
        }

        const referencingProp: ResponsiveValue<string> = props[typeName]
        if (!referencingProp) {
          // prop is not provided e.g. `size={null}`
          return null
        }

        return getResponsiveVariantStyles(
          typeConfig as VariantConfig,
          referencingProp,
          props,
        )
      },
    )
    .filter(isDefined)
}

export function interpretStyleConfig(
  colorMode: ColorMode,
  theme: Dict,
  styleConfig: StyleConfigOptions,
) {
  return function getStyles(props: Dict) {
    if (!styleConfig) {
      return null
    }

    const {
      defaultVariants = {},
      variants,
      baseStyle,
      ...restConfig
    } = styleConfig

    const mergedProps: StyleConfigThemingProps = mergeWith(
      { theme, colorMode },
      defaultVariants,
      props,
      filterUndefined(props),
    )

    const resolvedBaseStyle = runIfFn(baseStyle, mergedProps)
    const allVariantStyles = getAllVariantStyles(variants ?? {}, mergedProps)

    return mergeWith({}, resolvedBaseStyle, restConfig, ...allVariantStyles)
  }
}
