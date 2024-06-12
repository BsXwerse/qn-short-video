'use client';

import { get } from '@/common/http';
import type { Tag } from '@prisma/client';
import Link from 'next/link';
import useSWR from 'swr';
import Loading from '../../components/loading';

export default function LeftBar() {
	const { data } = useSWR<Tag[]>('/api/tag', get);

	return (
		<>
			<header className="hidden lg:flex items-center justify-center fixed w-[259px] h-14 bg-background text-foreground font-semibold text-lg shadow">
				Video Tag
			</header>
			{!data ? (
				<Loading />
			) : (
				<div className="hidden h-screen left-0 w-60 shrink-0 ml-5 border-r-[1px] border-foreground/30 lg:flex flex-col gap-2 px-8 py-14 text-foreground overflow-auto">
					{data?.map((x) => (
						<Link href={`/?tag=${x.name}`} key={x.id}>
							<div className=" px-5 inline-flex gap-2 h-14 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150 ">
								<span>{x.name}</span>
							</div>
						</Link>
					))}
				</div>
			)}
		</>
	);
}
