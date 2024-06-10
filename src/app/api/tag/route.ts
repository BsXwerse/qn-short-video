import { getAllTags } from '@/actions/tag';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const tags = await getAllTags();
		return NextResponse.json({
			code: 200,
			msg: 'ok',
			body: tags,
		});
	} catch (e: any) {
		console.error(e.message);
		return NextResponse.json({
			code: 500,
			msg: e.message,
		});
	}
}
