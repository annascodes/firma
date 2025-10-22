import { NextResponse } from "next/server";
import { db } from "lib/db";
import { auth } from "@clerk/nextjs/server";

type AttachmentBody = {
  name: string;
  mime: string;
  size?: number;
  url: string;
};

export async function POST(req: Request, { params }: { params: Promise<{ taskId: string }> }) {


  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { taskId } = await params;
  const body = (await req.json()) as AttachmentBody;

  if (!body.name || !body.url || !body.mime) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const attachment = await db.attachment.create({
    data: {
      name: body.name,
      mime: body.mime,
      size: body.size,
      url: body.url,
      uploadedById: user.id,
      taskId,
    },
  });

  return NextResponse.json({ attachment });
}
