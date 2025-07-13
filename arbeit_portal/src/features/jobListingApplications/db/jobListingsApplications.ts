import { db } from "@/drizzle/db"
import { JobListingApplicationTable } from "@/drizzle/schema"
import { revalidateJobListingApplicationCache } from "./cache/jobListingApplications"
import { and, eq } from "drizzle-orm"

export async function insertJobListingApplication(
  application: typeof JobListingApplicationTable.$inferInsert
) {
  await db.insert(JobListingApplicationTable).values(application)

  revalidateJobListingApplicationCache(application)
}

export async function updateJobListingApplication(
  {
    jobListingId,
    userId,
  }: {
    jobListingId: string
    userId: string
  },
  data: Partial<typeof JobListingApplicationTable.$inferInsert>
) {
  await db
    .update(JobListingApplicationTable)
    .set(data)
    .where(
      and(
        eq(JobListingApplicationTable.jobListingId, jobListingId),
        eq(JobListingApplicationTable.userId, userId)
      )
    )

  revalidateJobListingApplicationCache({ jobListingId, userId })
}
