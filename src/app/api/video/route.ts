import { getByTag, save } from '@/actions/video'
import { VideoItem } from '@/types/video'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        save(await req.json())
    } catch (err: any) {
        console.error('error while save video data to database\n', err)
        return NextResponse.json({
            code: 500,
            msg: 'video save failed'
        })
    }
    return NextResponse.json({
        code: 200,
        msg: 'video save success'
    })
}

export async function GET(req: NextRequest) {
    let items: VideoItem[] = []
    const url = new URL(req.url)
    try {
        const pn = url.searchParams.get('pageNum')
        const ps = url.searchParams.get('pageSize')
        const tag = url.searchParams.get('tag')
        if (pn === null || ps === null) {
            throw new Error('invild args')
        }
        items = await getByTag(parseInt(pn), parseInt(ps), tag ? tag : undefined)
    } catch (err: any) {
        return NextResponse.json({
            status: 500,
            msg: 'error'
        })
    }
    return NextResponse.json({
        code: 200,
        msg: 'ok',
        body: items
    })
}
