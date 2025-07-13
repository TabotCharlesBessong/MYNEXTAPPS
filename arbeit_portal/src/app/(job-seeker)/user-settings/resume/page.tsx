import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Suspense } from "react"
import { DropzoneClient } from "./_DropzoneClient"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getUserResumeIdTag } from "@/features/users/db/cache/userResumes"
import { db } from "@/drizzle/db"
import { UserResumeTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer"

export default function UserResumePage() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6 px-4">
      <h1 className="text-2xl font-bold">Upload Your Resume</h1>
      <Card>
        <CardContent>
          <DropzoneClient />
        </CardContent>
        <Suspense>
          <ResumeDetails />
        </Suspense>
      </Card>
      <Suspense>
        <AISummaryCard />
      </Suspense>
    </div>
  )
}

async function ResumeDetails() {
  const { userId } = await getCurrentUser()
  if (userId == null) return notFound()

  const userResume = await getUserResume(userId)
  if (userResume == null) return null

  return (
    <CardFooter>
      <Button asChild>
        <Link
          href={userResume.resumeFileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume
        </Link>
      </Button>
    </CardFooter>
  )
}

async function AISummaryCard() {
  const { userId } = await getCurrentUser()
  if (userId == null) return notFound()

  const userResume = await getUserResume(userId)
  if (userResume == null || userResume.aiSummary == null) return null

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>AI Summary</CardTitle>
        <CardDescription>
          This is an AI-generated summary of your resume. This is used by
          employers to quickly understand your qualifications and experience.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MarkdownRenderer source={userResume.aiSummary} />
      </CardContent>
    </Card>
  )
}

async function getUserResume(userId: string) {
  "use cache"
  cacheTag(getUserResumeIdTag(userId))

  return db.query.UserResumeTable.findFirst({
    where: eq(UserResumeTable.userId, userId),
  })
}
