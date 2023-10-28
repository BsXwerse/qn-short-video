import {save} from "@/actions/video";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        save(await req.json())
    } catch (err) {
        return NextResponse.json({
            status: 500,
            error: 'save video failed'
        })
    }
    return NextResponse.json({
        status: 200,
        error: 'OK'
    })
}