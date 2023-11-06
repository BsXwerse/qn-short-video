import { getToken } from '@/actions/oss-server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const token = getToken()
        return NextResponse.json({
            code: 200,
            msg: 'ok',
            body: token
        })
    } catch (err: any) {
        console.error(err.message)
        return NextResponse.json({
            code: 500,
            msg: err.message
        })
    }
}
