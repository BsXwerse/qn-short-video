import { getAllTags } from "@/actions/tag";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const tags = await getAllTags()
    return NextResponse.json({
        code: 200,
        msg: 'ok',
        body: tags
    })
}