"use client"

import { UploadDropzone } from "@/services/uploadthing/components/UploadThing"
import { useRouter } from "next/navigation"

export function DropzoneClient() {
  const router = useRouter()

  return (
    <UploadDropzone
      endpoint="resumeUploader"
      onClientUploadComplete={() => router.refresh()}
    />
  )
}
