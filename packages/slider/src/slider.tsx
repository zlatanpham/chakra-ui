import {
  chakra,
  forwardRef,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { createContext } from "@chakra-ui/react-utils"
import * as React from "react"
import { useSlider, UseSliderProps, UseSliderReturn } from "./use-slider"
import { part } from "@chakra-ui/theme-tools"

interface SliderContext
  extends Omit<UseSliderReturn, "getInputProps" | "getRootProps"> {}

const [SliderProvider, useSliderContext] = createContext<SliderContext>({
  name: "SliderContext",
  errorMessage:
    "useSliderContext: `context` is undefined. Seems you forgot to wrap all slider components within <Slider />",
})

export { SliderProvider, useSliderContext }

type Omitted = "size" | "defaultValue" | "onChange"
export interface SliderProps
  extends UseSliderProps,
    ThemingProps<"Slider">,
    Omit<HTMLChakraProps<"div">, Omitted> {}

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#slider
 */
export const Slider = forwardRef<SliderProps, "div">((props, ref) => {
  const styles = useStyleConfig("Slider", props)
  const ownProps = omitThemingProps(props)

  const { getInputProps, getRootProps, ...context } = useSlider(ownProps)

  const rootProps = getRootProps()
  const inputProps = getInputProps({}, ref)

  const rootStyles: SystemStyleObject = {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    ...styles,
  }

  return (
    <SliderProvider value={context}>
      <chakra.div {...rootProps} className="chakra-slider" __css={rootStyles}>
        {props.children}
        <input {...inputProps} />
      </chakra.div>
    </SliderProvider>
  )
})

Slider.defaultProps = {
  orientation: "horizontal",
}

if (__DEV__) {
  Slider.displayName = "Slider"
}

export interface SliderThumbProps extends HTMLChakraProps<"div"> {}

/**
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 */
export const SliderThumb = forwardRef<SliderThumbProps, "div">((props, ref) => {
  const { getThumbProps } = useSliderContext()

  const thumbStyles: SystemStyleObject = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    outline: 0,
  }

  const thumbProps = getThumbProps(props, ref)

  return (
    <chakra.div
      {...thumbProps}
      className={cx("chakra-slider__thumb", props.className)}
      __css={thumbStyles}
      {...part("Slider", "thumb").attributes}
    />
  )
})

if (__DEV__) {
  SliderThumb.displayName = "SliderThumb"
}

export interface SliderTrackProps extends HTMLChakraProps<"div"> {}

export const SliderTrack = forwardRef<SliderTrackProps, "div">((props, ref) => {
  const { getTrackProps } = useSliderContext()

  const trackStyles = {
    overflow: "hidden",
  }

  const trackProps = getTrackProps(props, ref)

  return (
    <chakra.div
      {...trackProps}
      className={cx("chakra-slider__track", props.className)}
      {...part("Slider", "track").attributes}
      __css={trackStyles}
    />
  )
})

if (__DEV__) {
  SliderTrack.displayName = "SliderTrack"
}

export interface SliderInnerTrackProps extends HTMLChakraProps<"div"> {}

export const SliderFilledTrack = forwardRef<SliderInnerTrackProps, "div">(
  (props, ref) => {
    const { getInnerTrackProps } = useSliderContext()

    const trackStyles = {
      width: "inherit",
      height: "inherit",
    }

    const trackProps = getInnerTrackProps(props, ref)

    return (
      <chakra.div
        {...trackProps}
        className="chakra-slider__filled-track"
        {...part("Slider", "filledTrack").attributes}
        __css={trackStyles}
      />
    )
  },
)

if (__DEV__) {
  SliderFilledTrack.displayName = "SliderFilledTrack"
}

export interface SliderMarkProps extends HTMLChakraProps<"div"> {
  value: number
}

/**
 * SliderMark is used to provide names for specific Slider
 * values by defining labels or markers along the track.
 *
 * @see Docs https://chakra-ui.com/docs/components/slider
 */
export const SliderMark = forwardRef<SliderMarkProps, "div">((props, ref) => {
  const { getMarkerProps } = useSliderContext()
  const markProps = getMarkerProps(props, ref)
  return (
    <chakra.div
      {...markProps}
      className={cx("chakra-slider__marker", props.className)}
    />
  )
})

if (__DEV__) {
  SliderMark.displayName = "SliderMark"
}
