import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
  colors: { hint: "gray.500" },
  components: {
    Popover: {
      baseStyle: {
        popper: {
          zIndex: 500,
          width: "fit-content",
          maxWidth: "fit-content",
        },
      },
    },
  },
})
