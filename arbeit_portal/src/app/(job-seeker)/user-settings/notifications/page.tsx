import { LoadingSpinner } from "@/components/LoadingSpinner"
import { Card, CardContent } from "@/components/ui/card"
import { db } from "@/drizzle/db"
import { UserNotificationSettingsTable } from "@/drizzle/schema"
import { NotificationsForm } from "@/features/users/components/NotificationsForm"
import { getUserNotificationSettingsIdTag } from "@/features/users/db/cache/userNotificationSettings"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth"
import { eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export default function NotificationsPage() {
  return (
    <Suspense>
      <SuspendedComponent />
    </Suspense>
  )
}

async function SuspendedComponent() {
  const { userId } = await getCurrentUser()
  if (userId == null) return notFound()

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>
      <Card>
        <CardContent>
          <Suspense fallback={<LoadingSpinner />}>
            <SuspendedForm userId={userId} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

async function SuspendedForm({ userId }: { userId: string }) {
  const notificationSettings = await getNotificationSettings(userId)

  return <NotificationsForm notificationSettings={notificationSettings} />
}

async function getNotificationSettings(userId: string) {
  "use cache"
  cacheTag(getUserNotificationSettingsIdTag(userId))

  return db.query.UserNotificationSettingsTable.findFirst({
    where: eq(UserNotificationSettingsTable.userId, userId),
    columns: {
      aiPrompt: true,
      newJobEmailNotifications: true,
    },
  })
}
