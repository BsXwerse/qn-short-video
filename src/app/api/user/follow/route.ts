import { isFollowed, addOrCancel } from "@/actions/follow";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const p = url.searchParams;
  try {
    const userId = p.get("userId");
    const uploaderId = p.get("uploaderId");
    if (userId === null || uploaderId === null) {
      throw new Error("invild args");
    }
    const isF = await isFollowed(userId, uploaderId);
    return NextResponse.json({
      code: 200,
      msg: "ok",
      body: isF,
    });
  } catch (e: any) {
    console.error(e.message);
    return NextResponse.json({
      code: 500,
      msg: e.message,
    });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    if (
      typeof body.userId !== "string" ||
      typeof body.uploaderId !== "string"
    ) {
      throw new Error("invild args");
    }
    const isFollowed = await addOrCancel(body.userId, body.uploaderId);
    return NextResponse.json({
      code: 200,
      msg: "ok",
      body: isFollowed,
    });
  } catch (e: any) {
    console.error(e.message);
    return NextResponse.json({
      code: 500,
      msg: e.message,
    });
  }
}
