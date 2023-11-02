import { getUrl } from '@/actions/oss-server'
import { NextResponse } from 'next/server'

//TODO 应该没用
export async function GET() {
    try {
        const url = getUrl('test/v.mp4')
        return NextResponse.json({
            code: 200,
            msg: 'ok',
            body: url
        })
    } catch (err: any) {
        console.error(err.message)
        return NextResponse.json({
            code: 500,
            msg: err.message
        })
    }
}
