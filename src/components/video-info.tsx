import { get, post } from '@/common/http';
import type { VideoItem } from '@/types/video';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import Favorite from './favorite';

export default function VideoInfo({
	item,
	isShow,
}: {
	item: VideoItem;
	isShow: boolean;
}) {
	const { data: session, status } = useSession();
	const router = useRouter();

	const { data: isFollowed, mutate: mutateFollow } = useSWR(
		['/api/user/follow', session?.user.id ?? '', item?.uploderId ?? ''],
		([url, userId, uploaderId]) =>
			get<boolean>(url, {
				userId,
				uploaderId,
			}),
	);

	const handleClick = useCallback(() => {
		if (status === 'unauthenticated') {
			router.push('/api/auth/signin');
		} else {
			session &&
				mutateFollow(
					async (pre) => {
						await post('/api/user/follow', {
							userId: session.user.id,
							uploaderId: item?.uploderId,
						});
						return !pre;
					},
					{
						optimisticData: (pre) => !pre,
						rollbackOnError: true,
						revalidate: false,
					},
				).catch((e) => toast.error(`操作失败: ${e?.message}`));
		}
	}, [item?.uploderId, mutateFollow, router, session, status]);

	const { data: isFavorited, mutate: mutateFavorite } = useSWR(
		['/api/user/favorite', session?.user.id ?? '', item.id],
		([url, userId, videoId]) =>
			get<boolean>(url, {
				userId,
				videoId,
			}),
	);

	const clickFavorite = useCallback(() => {
		if (status === 'unauthenticated') {
			router.push('/api/auth/signin');
		} else {
			session &&
				mutateFavorite(
					async (pre) => {
						await post('/api/user/favorite', {
							userId: session.user.id,
							videoId: item.id,
						});
						return !pre;
					},
					{
						optimisticData: (pre) => !pre,
						rollbackOnError: true,
						revalidate: false,
					},
				).catch((e) => toast.error(`操作失败: ${e?.message}`));
		}
	}, [item.id, mutateFavorite, router, session, status]);

	return (
		item && (
			<Transition
				show={isShow}
				className="absolute h-full w-full z-30 text-foreground flex flex-col justify-between"
			>
				<Transition.Child
					className="absolute h-full w-full bg-gradient-to-b from-black/50 to-60% mt-10 -translate-y-12"
					enter="transition ease-out duration-150"
					enterFrom="opacity-0 -translate-y-40"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease-in duration-150"
					leaveFrom="opacity-100 translate-y-0"
					leaveTo="opacity-0 -translate-y-40"
				/>

				<Transition.Child
					className="py-16 px-5 z-10"
					enter="transition ease-out duration-200"
					enterFrom="opacity-0 -translate-y-40"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease-in duration-150"
					leaveFrom="opacity-100 translate-y-0"
					leaveTo="opacity-0 -translate-y-40"
				>
					<p className="line-clamp-3 text-white">{item.introduction}</p>
				</Transition.Child>

				<Transition.Child
					className="flex items-end w-full justify-between lg:flex-row-reverse pb-16 px-5 z-10"
					enter="transition ease-out duration-200"
					enterFrom="opacity-0 translate-y-40"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease-in duration-150"
					leaveFrom="opacity-100 translate-y-0"
					leaveTo="opacity-0 translate-y-40"
				>
					<Favorite isFavorited={!!isFavorited} handleClick={clickFavorite} />
					<h2 className="font-semibold text-lg truncate max-lg:max-w-[250px] drop-shadow ">
						{item.title}
					</h2>
					<div className="flex flex-col items-center gap-3 lg:flex-row-reverse">
						<button
							className={clsx(
								'rounded-full font-semibold p-1 text-[12px] text-white shrink-0',
								{
									['bg-indigo-600']: !isFollowed,
									['bg-black/50']: isFollowed,
									['px-2']: !isFollowed,
								},
							)}
							onClick={handleClick}
						>
							{isFollowed ? '✔ followed' : '+ follow'}
						</button>
						<Image
							src={item.uploder.image as string}
							width={40}
							height={40}
							alt="uploader img"
							className=" rounded-full"
						/>
					</div>
				</Transition.Child>
			</Transition>
		)
	);
}
