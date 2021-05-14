import { isFunction, __TEST__ } from "@chakra-ui/assertion-utils"

export const scheduleMicrotask = (fn: VoidFunction) => {
  if (__TEST__) {
    fn()
  } else if (isFunction(queueMicrotask)) {
    queueMicrotask(fn)
  } else {
    Promise.resolve().then(fn)
  }
}
