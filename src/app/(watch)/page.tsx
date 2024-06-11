import { getByTag } from '@/actions/video';
import { PAGE_SIZE } from '@/common/constants';
import Player from '@/components/player';

export default async function Home() {
	return <Player />;
}
