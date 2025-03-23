import { MAX_IMAGES } from "@/config/constants";
import { endpoints } from "@/config/endpoints";
import type { ProgressArgs } from "@/config/types";
import { api } from "./api-client";

interface UploaderOptions {
  file: File;
  uuid: string;
  chunkSize?: number;
  threadsQuantity?: number;
}

interface FilePart {
  PartNumber: number;
  ETag: string;
  signedUrl: string;
}

export class Uploader {
  chunkSize: number;
  threadsQuantity: number;
  file: File | null;
  uuid: string;
  uploadedSize: number;
  progressCache: any;
  activeConnections: any;
  counter: number;
  aborted: boolean;
  parts: FilePart[];
  uploadedParts: FilePart[];
  fileId: string | undefined;
  fileKey: string | undefined;
  onProgressFn: (progressArgs: ProgressArgs) => void;
  onErrorFn: (error?: Error) => void;
  onCompleteFn: () => void;

  constructor(options: UploaderOptions) {
    // this must be bigger than or equal to 0.1mb
    // otherwise AWS will respond with "Your proposed upload is smaller than the minimum allowed size"
    this.chunkSize = options.chunkSize || 1024 * 1024 * 5;
    // this is # of parallel uploads
    this.threadsQuantity = Math.min(options.threadsQuantity || MAX_IMAGES, 50);
    this.file = options.file;
    this.uuid = options.uuid;
    this.aborted = false;
    this.uploadedSize = 0;
    this.progressCache = {};
    this.activeConnections = {};
    this.counter = 0;
    this.parts = [];
    this.uploadedParts = [];
    this.fileId = undefined;
    this.fileKey = undefined;
    this.onProgressFn = () => {};
    this.onErrorFn = () => {};
    this.onCompleteFn = () => {};
  }

  start() {
    this.initUpload();
  }

  async initUpload() {
    try {
      const ext = this.file?.name.split(".").pop();
      const name = this.file?.name.split(".").shift();
      let fileName = "";

      if (ext) {
        fileName += `${name?.replace(/\s+/g, "-")}.${ext}`;
      } else fileName += name;

      const imageInitialisationUploadInput = {
        name: fileName,
        uuid: this.uuid,
      };

      const AWSFileDataOutput = await api.post<{
        fileId: string;
        fileKey: string;
      }>(endpoints.images.initMultipartUpload, {
        json: imageInitialisationUploadInput,
      });

      this.fileId = AWSFileDataOutput.fileId;
      this.fileKey = AWSFileDataOutput.fileKey;

      // retrieve the pre-signed URLs from AWS
      const numberOfParts = Math.ceil(Number(this.file?.size) / this.chunkSize);

      const AWSMultipartFileDataInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: numberOfParts,
      };

      const urlsResponse = await api.post<{ parts: FilePart[] }>(
        endpoints.images.getMultipartUpload,
        {
          json: AWSMultipartFileDataInput,
        }
      );

      const newParts = urlsResponse.parts;
      this.parts.push(...newParts);
      this.sendNext();
    } catch (error) {
      await this.complete(error as Error);
    }
  }

  sendNext() {
    const activeConnections = Object.keys(this.activeConnections).length;
    if (activeConnections >= this.threadsQuantity) {
      return;
    }

    if (!this.parts.length) {
      if (!activeConnections) {
        this.complete();
      }
      return;
    }

    const part = this.parts.pop();

    if (this.file && part) {
      const sentSize = (part.PartNumber - 1) * this.chunkSize;
      const chunk = this.file.slice(
        sentSize,
        sentSize + this.chunkSize
      ) as File;

      const sendChunkStarted = () => {
        this.sendNext();
      };

      this.sendChunk(chunk, part, sendChunkStarted)
        .then(() => {
          this.sendNext();
        })
        .catch((error: Error) => {
          this.parts.push(part);
          this.complete(error);
        });
    }
  }

  sendChunk(chunk: File, part: FilePart, sendChunkStarted: () => void) {
    return new Promise((resolve, reject) => {
      this.upload(chunk, part, sendChunkStarted)
        .then((status) => {
          if (status !== 200) {
            reject(new Error("Failed chunk upload"));
            return;
          }

          resolve(status);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  upload(file: File, part: FilePart, sendChunkStarted: () => void) {
    // uploading each part with its pre-signed URL
    return new Promise((resolve, reject) => {
      if (this.fileId && this.fileKey) {
        const partNumberIndex = part.PartNumber - 1;
        this.activeConnections[partNumberIndex] = new XMLHttpRequest();
        const xhr: XMLHttpRequest = this.activeConnections[partNumberIndex];

        sendChunkStarted();

        const progressListener = this.handleUploadProgress.bind(
          this,
          part.PartNumber - 1
        );

        xhr.upload.addEventListener("progress", progressListener);
        xhr.addEventListener("error", progressListener);
        xhr.addEventListener("abort", progressListener);
        xhr.addEventListener("loadend", progressListener);

        xhr.open("PUT", part.signedUrl);

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const ETag = xhr.getResponseHeader("ETag");

            if (ETag) {
              const uploadedPart = {
                PartNumber: part.PartNumber,
                ETag: ETag.replaceAll('"', ""),
              } as FilePart;

              this.uploadedParts.push(uploadedPart);
              resolve(xhr.status);
              delete this.activeConnections[part.PartNumber - 1];
            }
          }
        };

        xhr.onerror = (error: any) => {
          reject(error);
          delete this.activeConnections[part.PartNumber - 1];
        };
        xhr.onabort = (error: any) => {
          reject(error);
          delete this.activeConnections[part.PartNumber - 1];
        };

        xhr.send(file);
      }
    });
  }

  handleUploadProgress(part: number, event: ProgressEvent) {
    if (this.file) {
      if (["progress", "error", "abort"].includes(event.type)) {
        this.progressCache[part] = event.loaded;
      }

      if (event.type === "uploaded") {
        this.uploadedSize += this.progressCache[part] || 0;
        delete this.progressCache[part];
      }

      const inProgress = Object.keys(this.progressCache)
        .map(Number)
        .reduce((memo, id) => memo + this.progressCache[id], 0);

      const sent = Math.min(this.uploadedSize + inProgress, this.file.size);
      const total = this.file.size;
      const percentage = Math.round((sent / total) * 100);

      this.onProgressFn({
        sent,
        total,
        percentage,
        key: this.fileKey as string,
        uuid: this.uuid,
      });
    }
  }

  async complete(error?: Error) {
    if (error) {
      this.onErrorFn(error);
      return;
    }

    try {
      await this.sendCompleteRequest();
    } catch (error) {
      this.onErrorFn(error as Error);
    }

    this.onCompleteFn();
  }

  async sendCompleteRequest() {
    try {
      if (this.fileId && this.fileKey) {
        const imageFinalisationMultipartInput = {
          fileId: this.fileId,
          fileKey: this.fileKey,
          parts: this.uploadedParts,
        };

        const result = await api.post(
          endpoints.images.finaliseMultipartUpload,
          {
            json: imageFinalisationMultipartInput,
          }
        );

        return result;
      }
    } catch (error) {
      console.log("Complete request issue:", error);
    }
  }

  onProgress(onProgress: any) {
    this.onProgressFn = onProgress;
    return this;
  }

  onError(onError: any) {
    this.onErrorFn = onError;
    return this;
  }

  onComplete(onComplete: any) {
    this.onCompleteFn = onComplete;
    return this;
  }

  abort() {
    for (const id in this.activeConnections) {
      this.activeConnections[id].abort();
    }
    this.aborted = true;
  }
}
