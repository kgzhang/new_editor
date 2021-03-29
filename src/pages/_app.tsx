
import "../../styles/globals.css"
import { NextPage } from "next"
import { AppProps } from "next/app"


import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../theme"


const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider resetCSS theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>)

export default App
