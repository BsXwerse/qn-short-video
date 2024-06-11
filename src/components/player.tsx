'use client';

import { PAGE_SIZE } from '@/common/constants';
import { get } from '@/common/http';
import Video from '@/components/video';
import type { VideoItem } from '@/types/video';
import { motion } from 'framer-motion';
import qs from 'qs';
import { useCallback, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import useSWRInfinite from 'swr/infinite';

export default function Player({
	tag,
}: {
	tag?: string;
}) {
	const getKey = useCallback(
		(pageIndex: number, previousPageData: VideoItem[]) => {
			if (previousPageData && previousPageData.length <= 0) return null;
			const query = qs.stringify(
				{
					pageNum: pageIndex,
					pageSize: PAGE_SIZE,
					tag: tag,
				},
				{
					arrayFormat: 'comma',
					skipNulls: true,
					addQueryPrefix: true,
					encode: true,
				},
			);
			return `/api/video${query}`;
		},
		[tag],
	);

	const { data, setSize } = useSWRInfinite(getKey, get<VideoItem[]>);

	const videoList = useMemo(() => {
		if (!data) return [];
		const list: VideoItem[] = [];
		for (const i of data) list.push(...i);
		return list;
	}, [data]);

	return (
		<div className="h-screen overflow-hidden">
			<Virtuoso
				className="snap-y snap-mandatory"
				data={videoList}
				endReached={() => setSize((pre) => pre + 1)}
				overscan={2000}
				itemContent={(_, data) => (
					<>
						<div className="h-[50px]" />
						<div className="h-screen snap-center snap-always relative">
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ margin: '-300px 0px' }}
								transition={{
									ease: 'easeIn',
									duration: 0.2,
								}}
								className="h-full"
							>
								<Video item={data} />
							</motion.div>
						</div>
						<div className="h-[50px]" />
					</>
				)}
			/>
		</div>
	);
}
