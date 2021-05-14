/**
|--------------------------------------------------
| Number assertions
|--------------------------------------------------
*/
export const isNumber = (value: any): value is number =>
  typeof value === "number"

/**
|--------------------------------------------------
| Array assertions
|--------------------------------------------------
*/
export const isArray = (value: unknown): value is Array<unknown> =>
  Array.isArray(value)

export const isArrayEmpty = (value: unknown): boolean =>
  isArray(value) && value.length === 0

/**
|--------------------------------------------------
| Function assertions
|--------------------------------------------------
*/

export const isFunction = (value: unknown): value is Function =>
  typeof value === "function"

/**
|--------------------------------------------------
| Object assertions
|--------------------------------------------------
*/
export const isObject = (value: unknown): value is Record<string, unknown> =>
  value != null && typeof value === "object" && !Array.isArray(value)

export const isObjectEmpty = (value: unknown) =>
  isObject(value) && Object.keys(value).length === 0

export const isRefObject = (value: unknown): value is { current: unknown } =>
  isObject(value) && "current" in value

/**
|--------------------------------------------------
| String assertions
|--------------------------------------------------
*/
export const isString = (value: unknown): value is string =>
  typeof value === "string"

export const isCssVar = (value: string): boolean => /^var\(--.+\)$/.test(value)

/**
|--------------------------------------------------
| Environment assertions
|--------------------------------------------------
*/

export const __DEV__ = process.env.NODE_ENV !== "production"

export const __TEST__ = process.env.NODE_ENV === "test"

export const isBrowser = () => typeof window !== "undefined"

export const isSafari = () =>
  /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)

export const isFirefox = () => /Firefox\/\d+\.\d+$/.test(navigator.userAgent)

export const isIOS = () => /(iPhone|iPod|iPad)/i.test(navigator.platform)

export const getDeviceType = () => {
  if (/(tablet)|(iPad)|(Nexus 9)/i.test(navigator.userAgent)) return "tablet"
  if (/(mobi)/i.test(navigator.userAgent)) return "mobile"
  return "desktop"
}

export const supportsPointerEvents = () =>
  isBrowser() && window.onpointerdown === null

export const supportsTouchEvents = () =>
  isBrowser() && window.ontouchstart === null

export const supportsMouseEvents = () =>
  isBrowser() && window.onmousedown === null

/**
|--------------------------------------------------
| Event assertions
|--------------------------------------------------
*/
export const isInputEvent = (
  event: unknown,
): event is { target: HTMLInputElement } =>
  event != null &&
  isObject(event) &&
  "target" in event &&
  event.target instanceof HTMLInputElement

export const isRightClickEvent = (event: Pick<MouseEvent, "button">) =>
  event.button !== 0

export const isTouchEvent = (event: unknown): event is TouchEvent =>
  !!(event instanceof TouchEvent && event.touches)

export const isMouseEvent = (event: unknown): event is MouseEvent =>
  // PointerEvent inherits from MouseEvent so we can't use a straight instanceof check.
  isPointerEvent(event)
    ? !!(event.pointerType === "mouse")
    : event instanceof MouseEvent

export const isMultiTouchEvent = (event: unknown) =>
  isTouchEvent(event) && event.touches.length > 1

export const isPointerEvent = (event: unknown): event is PointerEvent =>
  typeof PointerEvent !== "undefined" && event instanceof PointerEvent
