import { runIfFn } from "@chakra-ui/function-utils"
import { isRefObject } from "@chakra-ui/assertion-utils"
import {
  EventListenerWithPointInfo,
  getPointerEventName,
  wrapPointerEventHandler,
} from "./pointer-event"

type MaybeString<T> = T & (string & {})

type Target = Document | HTMLElement | EventTarget | null
type RefTarget = { current: HTMLElement | null }

type DOMEventTarget = (() => Target) | Target | RefTarget

export function addDomEvent<K extends keyof DocumentEventMap>(
  target: DOMEventTarget,
  event: MaybeString<K>,
  listener: EventListener,
  options?: boolean | AddEventListenerOptions,
) {
  const node = isRefObject(target) ? target.current : runIfFn(target)
  node.addEventListener(event, listener, options)
  return () => {
    node.removeEventListener(event, listener, options)
  }
}

export function addPointerEvent<K extends keyof DocumentEventMap>(
  target: EventTarget,
  event: MaybeString<K>,
  handler: EventListenerWithPointInfo,
  options?: AddEventListenerOptions,
) {
  return addDomEvent(
    target,
    getPointerEventName(event),
    wrapPointerEventHandler(handler, event === "pointerdown"),
    options,
  )
}
