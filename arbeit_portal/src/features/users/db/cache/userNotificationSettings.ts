import { getGlobalTag, getIdTag } from "@/lib/dataCache"
import { revalidateTag } from "next/cache"

export function getUserNotificationSettingsGlobalTag() {
  return getGlobalTag("userNotificationSettings")
}

export function getUserNotificationSettingsIdTag(userId: string) {
  return getIdTag("userNotificationSettings", userId)
}

export function revalidateUserNotificationSettingsCache(userId: string) {
  revalidateTag(getUserNotificationSettingsGlobalTag())
  revalidateTag(getUserNotificationSettingsIdTag(userId))
}
