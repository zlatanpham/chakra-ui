import {
  isMouseEvent,
  isRightClickEvent,
  isTouchEvent,
  supportsMouseEvents,
  supportsPointerEvents,
  supportsTouchEvents,
} from "@chakra-ui/assertion-utils"

export type AnyPointerEvent = MouseEvent | TouchEvent | PointerEvent

type PointType = "page" | "client"

export interface Point {
  x: number
  y: number
}

export interface PointerEventInfo {
  point: Point
}

export type EventListenerWithPointInfo = (
  event: AnyPointerEvent,
  info: PointerEventInfo,
) => void

/**
 * Filters out events not attached to the primary pointer
 * (currently left mouse button)
 */
function filterPrimaryPointer(listener: EventListener): EventListener {
  return (event: Event) => {
    const isPrimaryPointer = !isMouseEvent(event) || !isRightClickEvent(event)
    if (isPrimaryPointer) {
      listener(event)
    }
  }
}

const defaultPagePoint = { pageX: 0, pageY: 0 }

function pointFromTouch(event: TouchEvent, pointType: PointType = "page") {
  const primaryTouch = event.touches[0] || event.changedTouches[0]
  const point = primaryTouch || defaultPagePoint

  return {
    x: point[`${pointType}X`],
    y: point[`${pointType}Y`],
  }
}

function pointFromMouse(
  point: MouseEvent | PointerEvent,
  pointType: PointType = "page",
) {
  return {
    x: point[`${pointType}X`],
    y: point[`${pointType}Y`],
  }
}

export function extractEventInfo(
  event: AnyPointerEvent,
  pointType: PointType = "page",
): PointerEventInfo {
  return {
    point: isTouchEvent(event)
      ? pointFromTouch(event, pointType)
      : pointFromMouse(event, pointType),
  }
}

export function getViewportPointFromEvent(event: AnyPointerEvent) {
  return extractEventInfo(event, "client")
}

export const wrapPointerEventHandler = (
  handler: EventListenerWithPointInfo,
  shouldFilterPrimaryPointer = false,
): EventListener => {
  const listener = (event: AnyPointerEvent) =>
    handler(event, extractEventInfo(event))
  return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener
}

interface PointerNameMap {
  pointerdown: string
  pointermove: string
  pointerup: string
  pointercancel: string
  pointerover?: string
  pointerout?: string
  pointerenter?: string
  pointerleave?: string
}

const mouseEventNames: PointerNameMap = {
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointercancel: "mousecancel",
  pointerover: "mouseover",
  pointerout: "mouseout",
  pointerenter: "mouseenter",
  pointerleave: "mouseleave",
}

const touchEventNames: PointerNameMap = {
  pointerdown: "touchstart",
  pointermove: "touchmove",
  pointerup: "touchend",
  pointercancel: "touchcancel",
}

export function getPointerEventName(name: string) {
  if (supportsPointerEvents()) return name
  if (supportsTouchEvents()) return touchEventNames[name]
  if (supportsMouseEvents()) return mouseEventNames[name]
  return name
}
