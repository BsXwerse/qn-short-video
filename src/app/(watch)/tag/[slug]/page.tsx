import { getByTag } from '@/actions/video';
import { PAGE_SIZE } from '@/common/constants';
import Player from '@/components/player';

export default async function TagPlayer({
	params,
}: {
	params: { slug: string };
}) {
	const preData = await getByTag(0, PAGE_SIZE, params.slug);
	return <Player tag={params.slug} preData={preData} />;
}
