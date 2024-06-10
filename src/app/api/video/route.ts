import { getByTag, save } from '@/actions/video';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		if (!body.title || !body.video || !body.cover || !body.uploaderId) {
			throw new Error('invild args');
		}
		save(body);
		return NextResponse.json({
			code: 200,
			msg: 'video save success',
		});
	} catch (err: any) {
		console.error(err.message);
		return NextResponse.json({
			code: 500,
			msg: err.message,
		});
	}
}

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	try {
		const pn = url.searchParams.get('pageNum');
		const ps = url.searchParams.get('pageSize');
		const tag = url.searchParams.get('tag');
		if (pn === null || ps === null) {
			throw new Error('invild args');
		}
		const items = await getByTag(
			Number.parseInt(pn),
			Number.parseInt(ps),
			tag ? tag : undefined,
		);
		return NextResponse.json({
			code: 200,
			msg: 'ok',
			body: items,
		});
	} catch (err: any) {
		console.error(err.message);
		return NextResponse.json({
			code: 500,
			msg: err.message,
		});
	}
}
