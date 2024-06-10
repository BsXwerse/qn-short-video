'use client';

import { get } from '@/common/http';
import Loading from '@/components/loading';
import Modal from '@/components/modal';
import VideoCard from '@/components/video-card';
import type { VideoItem } from '@/types/video';
import { useDebouncedValue } from 'foxact/use-debounced-value';
import { useState } from 'react';
import useSWR from 'swr';

export default function Search() {
	const [search, setSearch] = useState('');

	const searchValue = useDebouncedValue(search, 500);

	const { data: videos, isLoading } = useSWR(
		['/api/video/search', searchValue],
		([url, s]) =>
			get<VideoItem[]>(url, {
				keywords: s,
			}),
	);

	return (
		<Modal>
			<div className="max-w-sm w-full h-auto border-[1px] border-muted-foreground bg-background rounded-lg flex items-center justify-center gap-3 p-4 text-foreground mx-5">
				<input
					type="text"
					className="border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-muted-foreground placeholder:text-sm sm:text-sm sm:leading-6 outline-none w-full"
					value={search}
					onChange={(e: any) => {
						setSearch(e.target.value);
					}}
				/>
				<div className="i-tabler-search text-2xl" />
			</div>
			<div className="max-w-2xl my-10 flex flex-col gap-4 max-h-[70vh] lg:max-h-[70vh] overflow-auto mx-5">
				{isLoading ? (
					<Loading />
				) : (
					videos?.map((x) => (
						<VideoCard item={x} key={x.id} jumpUrl="/search/play/" />
					))
				)}
			</div>
		</Modal>
	);
}
