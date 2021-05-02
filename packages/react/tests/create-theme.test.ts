import { themeSkeleton } from "../src/create-theme"
import { isChakraTheme } from "@chakra-ui/theme"

describe("createTheme", () => {
  describe("theme skeleton", () => {
    it("should be a valid chakra theme", () => {
      expect(isChakraTheme(themeSkeleton)).toBe(true)
    })
  })
})
