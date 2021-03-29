import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import { Canvas, ContainerProps } from "react-three-fiber"
import { theme } from "../theme"

const ThemeProvider: React.FC = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

export const ForwardContext: React.FC<
  ContainerProps & { ExtraProviders?: React.FC }
> = ({ ExtraProviders, children, ...props }) => (
  <Canvas {...props}>
    <ThemeProvider>
      {ExtraProviders != null ? (
        <ExtraProviders>{children}</ExtraProviders>
      ) : (
        children
      )}
    </ThemeProvider>
  </Canvas>
)
