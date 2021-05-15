const kebabCase = (str: string) =>
  str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase()

const join = (scope: string, part: string) =>
  [scope, kebabCase(part)].join("__")

const toPart = (value: string) => ({
  selector: `[data-part=${value}]`,
  attrs: { "data-part": value },
  toString(): string {
    return this.selector
  },
})

type AnatomyPart = ReturnType<typeof toPart>

type Anatomy<T extends string> = Record<T, AnatomyPart> & {
  readonly extend: <U extends string>(...args: U[]) => Anatomy<T | U>
  readonly selectors: Record<T, string>
}

export function anatomy(root: string) {
  const map: Record<string, AnatomyPart> = {}
  return {
    parts<T extends string>(...values: T[]) {
      for (const part of values) {
        map[part] = toPart(join(root, part))
      }

      Object.defineProperty(map, "extend", {
        enumerable: false,
        writable: false,
        value: <T extends string>(...parts: T[]) => {
          for (const part of parts) {
            if (part in map) continue
            map[part] = toPart(join(root, part))
          }
          return map
        },
      })

      Object.defineProperty(map, "selectors", {
        enumerable: false,
        get() {
          return Object.fromEntries(
            Object.entries(map).map(([key, part]) => [key, part.selector]),
          )
        },
      })

      return map as Anatomy<T>
    },
  }
}
