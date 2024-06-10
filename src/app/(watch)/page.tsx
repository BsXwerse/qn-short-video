import { getByTag } from '@/actions/video';
import { PAGE_SIZE } from '@/common/constants';
import Player from '@/components/player';

export default async function Home() {
	const preData = await getByTag(0, PAGE_SIZE);
	return <Player preData={preData} />;
}
