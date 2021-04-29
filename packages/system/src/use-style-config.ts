import { StyleConfigOptions } from "@chakra-ui/styled-system"
import { Dict, get } from "@chakra-ui/utils"
import { useChakra } from "./hooks"
import { ThemingProps } from "./system.types"
import { interpretStyleConfig } from "@chakra-ui/styled-system"

export function useStyleConfig(
  themeKey: string,
  props: ThemingProps & Dict = {},
) {
  const { theme, colorMode } = useChakra()
  const { styleConfig, ...rest } = props
  const config: StyleConfigOptions =
    styleConfig ?? get(theme, `components.${themeKey}`)
  const getStyles = interpretStyleConfig(colorMode, theme, config)
  return getStyles(rest)
}
