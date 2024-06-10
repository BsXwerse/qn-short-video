'use client';

import { get } from '@/common/http';
import Loading from '@/components/loading';
import VideoCard from '@/components/video-card';
import type { VideoItem } from '@/types/video';
import Image from 'next/image';
import useSWR from 'swr';
import DefaultImg from '../../../public/imgs/default.png';

export default function VideoList({
	id,
	preData,
}: {
	id: string;
	preData?: VideoItem[];
}) {
	const { data: videos } = useSWR(
		['/api/favorite/all', id],
		([url, id]) =>
			get<VideoItem[]>(url, {
				id,
			}),
		{ fallbackData: preData },
	);

	return (
		<>
			{!videos ? (
				<Loading />
			) : videos && videos.length > 0 ? (
				videos.map((x) => (
					<VideoCard key={x.id} item={x} jumpUrl="/favorites/play/" />
				))
			) : (
				<Image
					src={DefaultImg}
					alt="no video"
					width={1000}
					height={1000}
					className="w-full h-full"
				/>
			)}
		</>
	);
}
