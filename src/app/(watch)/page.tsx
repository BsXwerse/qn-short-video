import { getByTag } from '@/actions/video';
import { PAGE_SIZE } from '@/common/constants';
import Player from '@/app/(watch)/player';

export default async function Home({
	searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const search = searchParams?.['tag'] ?? undefined;
	const tag = Array.isArray(search) ? search[0] : search;
	const preData = await getByTag(0, PAGE_SIZE, tag);
	return <Player preData={preData} tag={tag} />;
}
