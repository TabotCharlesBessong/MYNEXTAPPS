import { getGlobalTag, getIdTag, getOrganizationTag } from "@/lib/dataCache"
import { revalidateTag } from "next/cache"

export function getJobListingGlobalTag() {
  return getGlobalTag("jobListings")
}

export function getJobListingOrganizationTag(organizationId: string) {
  return getOrganizationTag("jobListings", organizationId)
}

export function getJobListingIdTag(id: string) {
  return getIdTag("jobListings", id)
}

export function revalidateJobListingCache({
  id,
  organizationId,
}: {
  id: string
  organizationId: string
}) {
  revalidateTag(getJobListingGlobalTag())
  revalidateTag(getJobListingOrganizationTag(organizationId))
  revalidateTag(getJobListingIdTag(id))
}
