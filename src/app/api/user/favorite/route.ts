import { addOrCancel, isFavorited } from '@/actions/favorite'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const p = url.searchParams
    try {
        const userId = p.get('userId')
        const videoId = p.get('videoId')
        if (userId === null || videoId === null) {
            throw new Error('invild args')
        }
        const isF = await isFavorited(userId, parseInt(videoId))
        return NextResponse.json({
            code: 200,
            msg: 'ok',
            body: isF
        })
    } catch (e: any) {
        console.error(e.message)
        return NextResponse.json({
            code: 500,
            msg: e.message
        })
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    try {
        if (typeof body.userId !== 'string' || typeof body.videoId !== 'number') {
            throw new Error('invild args')
        }
        const isAdded = await addOrCancel(body.userId, parseInt(body.videoId))
        return NextResponse.json({
            code: 200,
            msg: 'ok',
            body: isAdded
        })
    } catch (e: any) {
        console.error(e.message)
        return NextResponse.json({
            code: 500,
            msg: e.message
        })
    }
}
