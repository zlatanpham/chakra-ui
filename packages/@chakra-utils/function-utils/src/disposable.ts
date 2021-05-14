export function disposables() {
  const disposables = new Set<Function>()

  const api = {
    requestAnimationFrame(fn: VoidFunction) {
      const id = requestAnimationFrame(fn)
      api.add(() => cancelAnimationFrame(id))
    },

    nextTick(fn: VoidFunction) {
      api.requestAnimationFrame(() => {
        api.requestAnimationFrame(fn)
      })
    },

    setTimeout(fn: VoidFunction, timeout?: number) {
      const id = setTimeout(fn, timeout)
      api.add(() => clearTimeout(id))
    },

    setInterval(fn: VoidFunction, timeout?: number) {
      const id = setInterval(fn, timeout)
      api.add(() => clearInterval(id))
    },

    mutationObserver(fn: MutationCallback, config?: MutationObserverInit) {
      const observer = new MutationObserver(fn)
      return (node: Node) => {
        observer.observe(node, config)
        api.add(() => observer.disconnect())
      }
    },

    add(fn: VoidFunction) {
      disposables.add(fn)
    },

    dispose() {
      disposables.forEach((dispose) => dispose())
      disposables.clear()
    },
  }

  return api
}
