import { getGlobalTag, getIdTag } from "@/lib/dataCache"
import { revalidateTag } from "next/cache"

export function getOrganizationUserSettingsGlobalTag() {
  return getGlobalTag("organizationUserSettings")
}

export function getOrganizationUserSettingsIdTag({
  userId,
  organizationId,
}: {
  userId: string
  organizationId: string
}) {
  return getIdTag("organizationUserSettings", `${organizationId}-${userId}`)
}

export function revalidateOrganizationUserSettingsCache(id: {
  organizationId: string
  userId: string
}) {
  revalidateTag(getOrganizationUserSettingsGlobalTag())
  revalidateTag(getOrganizationUserSettingsIdTag(id))
}
