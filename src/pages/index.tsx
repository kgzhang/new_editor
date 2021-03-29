import Head from "next/head"
import dynamic from "next/dynamic"

const Cube = dynamic(() => import("../components/protein"), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Cube />
    </>
  )
}
