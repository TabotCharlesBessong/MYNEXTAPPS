import { connection } from "next/server"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { customFileRouter } from "../router"
import { Suspense } from "react"

export function UploadThingSSR() {
  return (
    <Suspense>
      <UTSSR />
    </Suspense>
  )
}

async function UTSSR() {
  await connection()
  return <NextSSRPlugin routerConfig={extractRouterConfig(customFileRouter)} />
}
