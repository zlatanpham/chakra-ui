type MaybeString<T> = T & (string & {})

type Target = EventTarget | Document | HTMLElement | null
type RefTarget = { current: HTMLElement | null }

type DOMEventTarget = (() => Target) | Target | RefTarget

export function addDomEvent<K extends keyof DocumentEventMap>(
  target: DOMEventTarget,
  event: MaybeString<K>,
  listener: EventListener,
  options?: boolean | AddEventListenerOptions,
) {
  target.addEventListener(event, listener, options)
  return () => {
    target.removeEventListener(event, listener, options)
  }
}
