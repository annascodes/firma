import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@clerk/nextjs/server";

/**
 * This route provides secure upload tokens to the client.
 * The client uses it with `@vercel/blob/client`'s `upload()` function.
 */
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as HandleUploadBody;

  const jsonResponse = await handleUpload({
    body,
    request: req,
    onBeforeGenerateToken: async () => ({
      allowedContentTypes: [
        "image/*",
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      addRandomSuffix: true,
      access: "public",
      tokenPayload: JSON.stringify({ userId }),
    }),
    onUploadCompleted: async ({ blob }) => {
      console.log("✅ Upload complete:", blob.url);
    },
  });

  return NextResponse.json(jsonResponse);
}
