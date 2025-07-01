import { Suspense } from "react"
import {
  getCurrentOrganization,
  getCurrentUser,
} from "@/services/clerk/lib/getCurrentAuth"
import { SignOutButton } from "@/services/clerk/components/AuthButtons"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { LogOutIcon } from "lucide-react"
import { SidebarOrganizationButtonClient } from "./_SidebarOrganizationButtonClient"

export function SidebarOrganizationButton() {
  return (
    <Suspense>
      <SidebarOrganizationSuspense />
    </Suspense>
  )
}

async function SidebarOrganizationSuspense() {
  const [{ user }, { organization }] = await Promise.all([
    getCurrentUser({ allData: true }),
    getCurrentOrganization({ allData: true }),
  ])

  if (user == null || organization == null) {
    return (
      <SignOutButton>
        <SidebarMenuButton>
          <LogOutIcon />
          <span>Log Out</span>
        </SidebarMenuButton>
      </SignOutButton>
    )
  }

  return (
    <SidebarOrganizationButtonClient user={user} organization={organization} />
  )
}
