import { PricingTable as ClerkPricingTable } from "@clerk/nextjs"

export function PricingTable() {
  return (
    <ClerkPricingTable
      forOrganizations
      newSubscriptionRedirectUrl="/employer/pricing"
    />
  )
}
