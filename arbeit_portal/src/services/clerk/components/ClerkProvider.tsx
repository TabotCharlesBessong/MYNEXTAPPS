"use client"

import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs"
import { ReactNode, Suspense } from "react"
import { dark } from "@clerk/themes"
import { useIsDarkMode } from "@/hooks/useIsDarkMode"

export function ClerkProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useIsDarkMode()
  return (
    // <Suspense>
    <OriginalClerkProvider
      appearance={isDarkMode ? { baseTheme: [dark] } : undefined}
    >
      {children}
    </OriginalClerkProvider>
    // </Suspense>
  )
}
