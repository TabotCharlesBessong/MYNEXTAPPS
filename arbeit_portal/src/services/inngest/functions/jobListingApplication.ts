import { db } from "@/drizzle/db"
import { inngest } from "../client"
import { and, eq } from "drizzle-orm"
import {
  JobListingApplicationTable,
  JobListingTable,
  UserResumeTable,
} from "@/drizzle/schema"
import { applicantRankingAgent } from "../ai/applicantRankingAgent"

export const rankApplication = inngest.createFunction(
  { id: "rank-applicant", name: "Rank Applicant" },
  { event: "app/jobListingApplication.created" },
  async ({ step, event }) => {
    const { userId, jobListingId } = event.data

    const getCoverLetter = step.run("get-cover-letter", async () => {
      const application = await db.query.JobListingApplicationTable.findFirst({
        where: and(
          eq(JobListingApplicationTable.userId, userId),
          eq(JobListingApplicationTable.jobListingId, jobListingId)
        ),
        columns: { coverLetter: true },
      })

      return application?.coverLetter
    })

    const getResume = step.run("get-resume", async () => {
      const resume = await db.query.UserResumeTable.findFirst({
        where: eq(UserResumeTable.userId, userId),
        columns: { aiSummary: true },
      })

      return resume?.aiSummary
    })

    const getJobListing = step.run("get-job-listing", async () => {
      return await db.query.JobListingTable.findFirst({
        where: eq(JobListingTable.id, jobListingId),
        columns: {
          id: true,
          city: true,
          description: true,
          experienceLevel: true,
          locationRequirement: true,
          stateAbbreviation: true,
          title: true,
          wage: true,
          wageInterval: true,
          type: true,
        },
      })
    })

    const [coverLetter, resumeSummary, jobListing] = await Promise.all([
      getCoverLetter,
      getResume,
      getJobListing,
    ])

    if (resumeSummary == null || jobListing == null) return

    await applicantRankingAgent.run(
      JSON.stringify({ coverLetter, resumeSummary, jobListingId, userId })
    )
  }
)
