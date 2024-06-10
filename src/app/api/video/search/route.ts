import { getByKeyWords } from '@/actions/video';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	try {
		const key = url.searchParams.get('keywords');
		if (key === null) {
			throw new Error('invild args');
		}
		const items = await getByKeyWords(key);
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
