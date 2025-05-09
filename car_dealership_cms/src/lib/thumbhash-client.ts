import { rgbaToThumbHash } from "thumbhash";

export async function generateThumbHashFromFile(file: File) {
  const img = new Image();
  img.src = URL.createObjectURL(file);

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const maxSize = 100;
  const scale = Math.min(maxSize / img.width, maxSize / img.height);
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const thumbhash = rgbaToThumbHash(
    canvas.width,
    canvas.height,
    imageData.data
  );

  URL.revokeObjectURL(img.src);

  return Buffer.from(thumbhash).toString("base64");
}
