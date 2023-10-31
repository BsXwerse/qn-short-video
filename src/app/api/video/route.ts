import { getByTag, save } from '@/actions/video'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        //TODO 参数检查
        save(await req.json())
        return NextResponse.json({
            code: 200,
            msg: 'video save success'
        })
    } catch (err: any) {
        console.error(err.message)
        return NextResponse.json({
            code: 500,
            msg: err.message
        })
    }
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    try {
        const pn = url.searchParams.get('pageNum')
        const ps = url.searchParams.get('pageSize')
        const tag = url.searchParams.get('tag')
        if (pn === null || ps === null) {
            throw new Error('invild args')
        }
        const items = await getByTag(parseInt(pn), parseInt(ps), tag ? tag : undefined)
        return NextResponse.json({
            code: 200,
            msg: 'ok',
            body: items
        })
    } catch (err: any) {
        console.error(err.message)
        return NextResponse.json({
            code: 500,
            msg: err.message
        })
    }
}
