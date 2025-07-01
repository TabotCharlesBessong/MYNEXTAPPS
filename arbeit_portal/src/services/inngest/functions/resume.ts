import { db } from "@/drizzle/db"
import { inngest } from "../client"
import { eq } from "drizzle-orm"
import { UserResumeTable } from "@/drizzle/schema"
import { env } from "@/data/env/server"
import { updateUserResume } from "@/features/users/db/userResumes"

export const createAiSummaryOfUploadedResume = inngest.createFunction(
  {
    id: "create-ai-summary-of-uploaded-resume",
    name: "Create AI Summary of Uploaded Resume",
  },
  {
    event: "app/resume.uploaded",
  },
  async ({ step, event }) => {
    const { id: userId } = event.user

    const userResume = await step.run("get-user-resume", async () => {
      return await db.query.UserResumeTable.findFirst({
        where: eq(UserResumeTable.userId, userId),
        columns: { resumeFileUrl: true },
      })
    })

    if (userResume == null) return

    const result = await step.ai.infer("create-ai-summary", {
      model: step.ai.models.anthropic({
        model: "claude-3-5-sonnet-latest",
        defaultParameters: { max_tokens: 2048 },
        apiKey: env.ANTHROPIC_API_KEY,
      }),
      body: {
        messages: [
          {
            role: "user",
            content: [
              {
                type: "document",
                source: {
                  type: "url",
                  url: userResume.resumeFileUrl,
                },
              },
              {
                type: "text",
                text: "Summarize the following resume and extract all key skills, experience, and qualifications. The summary should include all the information that a hiring manager would need to know about the candidate in order to determine if they are a good fit for a job. This summary should be formatted as markdown. Do not return any other text. If the file does not look like a resume return the text 'N/A'.",
              },
            ],
          },
        ],
      },
    })

    await step.run("save-ai-summary", async () => {
      const message = result.content[0]
      if (message.type !== "text") return

      await updateUserResume(userId, { aiSummary: message.text })
    })
  }
)
