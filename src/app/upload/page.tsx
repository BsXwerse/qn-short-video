'use client';

import { uploadOSS } from '@/actions/oss-client';
import { get, post } from '@/common/http';
import type { VideoDto } from '@/types/video';
import { Combobox } from '@headlessui/react';
import type { Tag } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type MouseEvent, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';

const KB = 1024;
const MB = 1024 * KB;

type FormValues = {
	title: string;
	introduction: string;
	cover: FileList;
	video: FileList;
};

export default function Upload() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [tagValue, setTagValue] = useState('');
	const [addedTags, setAddedTags] = useState<string[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const { data: tags } = useSWR<Tag[]>('/api/tag', get);

	if (status === 'unauthenticated') {
		return (
			<div className="w-screen h-screen inset-x-0 flex items-center justify-center text-foreground text-2xl">
				<Link href="/api/auth/signin" className=" underline">
					please login
				</Link>
			</div>
		);
	}

	if (status === 'loading') {
		return (
			<div className="w-screen h-screen flex items-center justify-center text-2xl text-foreground">
				<div className="i-tabler-loader2 text-2xl animate-spin" />
			</div>
		);
	}

	const filterTags =
		tagValue === ''
			? tags ?? []
			: tags?.filter((x) =>
					x.name.toLowerCase().includes(tagValue.toLowerCase()),
				) ?? [];

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		if (!session) {
			toast.error('Session get failed');
			return;
		}
		const cover = data.cover[0];
		const video = data.video[0];

		const v_uuid = uuidv4();
		const c_uuid = uuidv4();
		const v_key = `video/${v_uuid}.mp4`;
		let c_key = `cover/${c_uuid}`;
		// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
		cover.name.endsWith('jpg') ? (c_key += '.jpg') : (c_key += '.png');

		const dto: VideoDto = {
			title: data.title,
			introduction: data.introduction,
			tags: addedTags,
			cover: c_key,
			video: v_key,
			uploaderId: session.user.id,
		};

		const videoPromise = uploadOSS(video, v_key);
		const coverPromise = uploadOSS(cover, c_key);
		const ossPromise = Promise.all([videoPromise, coverPromise]);

		const dbPromise = ossPromise
			.then(() => post('/api/video', dto))
			.then(() => 'done')
			.catch((err) => {
				throw err;
			});

		toast.promise(dbPromise, {
			loading: 'uploading...',
			success: 'upload successful',
			error: 'upload failed',
		});

		dbPromise.then(
			() => router.push('/'),
			(x) => console.error(x),
		);
	};

	return (
		<div className="mx-auto max-w-2xl inset-x-0 flex items-center justify-center text-lg bg-background text-foreground">
			<form className="w-full py-10 px-8" onSubmit={handleSubmit(onSubmit)}>
				<div className="pb-12">
					<h2 className="text-lg font-semibold leading-7 text-foreground">
						Upload
					</h2>
					<p className="mt-1 text-sm leading-6 text-muted-foreground">
						Upload your wonderful story!
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						{/* title */}
						<div className="sm:col-span-4">
							<div className="flex gap-5 items-center">
								<label
									htmlFor="title"
									className="block text-lg font-medium leading-6 text-foreground"
								>
									Title
								</label>
								{errors.title && (
									<span className=" text-red-500 text-sm">
										Please enter title
									</span>
								)}
							</div>
							<div className="flex rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md outline-none mt-2">
								<input
									className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-muted-foreground placeholder:text-sm focus:ring-0 sm:text-sm sm:leading-6 outline-none"
									placeholder="video title"
									{...register('title', { required: true })}
								/>
							</div>
						</div>
						{/*introduction  */}
						<div className="col-span-full">
							<div className="flex gap-5 items-center">
								<label
									htmlFor="title"
									className="block text-lg font-medium leading-6 text-foreground"
								>
									Introduction
								</label>
								{errors.introduction && (
									<span className=" text-red-500 text-sm">
										Please enter introduction
									</span>
								)}
							</div>
							<div className="mt-2 text-foreground">
								<textarea
									rows={3}
									className="block w-full rounded-md p-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none text-foreground bg-background"
									placeholder="some words."
									{...register('introduction', { required: true })}
								/>
							</div>
							<p className="mt-3 text-sm leading-6 text-muted-foreground">
								A short introduction to the video.
							</p>
						</div>
						{/* tag  */}
						<div className="col-span-full">
							<label
								htmlFor="tag"
								className="block text-lg font-medium leading-6 text-foreground"
							>
								Tags
							</label>
							<div className="mt-2 space-x-2">
								<Combobox value={tagValue} onChange={setTagValue}>
									<Combobox.Input
										onChange={(e) => setTagValue(e.target.value)}
										className=" text-foreground bg-background ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 outline-none rounded-md py-1 px-2"
									/>
									<Combobox.Options className="border-foreground/30 border-[1px] rounded-md text-foreground space-y-1 px-2 max-h-52 overflow-auto max-w-[200px] absolute bg-background my-4">
										{filterTags.map((x) => (
											<Combobox.Option
												key={x.id}
												value={x.name}
												className="hover:cursor-pointer hover:bg-foreground/20 rounded px-3 py-[2px]"
											>
												{x.name}
											</Combobox.Option>
										))}
									</Combobox.Options>
								</Combobox>
								<button
									onClick={(e: MouseEvent) => {
										e.preventDefault();
										if (tagValue.length > 0)
											setAddedTags([...new Set([...addedTags, tagValue])]);
									}}
									className="text-foreground align-middle"
								>
									<div className="i-tabler-plus text-2xl" />
								</button>
							</div>
							<div className="flex gap-2 flex-wrap py-5 text-foreground border-[1px] border-muted-foreground rounded-lg my-5 px-5 min-w-[100px] min-h-[50px]">
								{addedTags.map((x, index) => (
									<span key={index + x}>{x}</span>
								))}
							</div>
							<button
								className=" font-semibold hover:text-foreground/50 text-sm"
								onClick={(e: MouseEvent) => {
									e.preventDefault();
									setAddedTags([]);
								}}
							>
								Clear all tags
							</button>
						</div>
						{/* cover */}
						<div className="col-span-full">
							<div className="flex gap-5 items-center">
								<label
									htmlFor="title"
									className="block text-lg font-medium leading-6 text-foreground"
								>
									Video cover
								</label>
								{errors.cover && (
									<span className=" text-red-500 text-sm">
										{errors.cover.message}
									</span>
								)}
							</div>
							<div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-muted-foreground px-6 py-10">
								<div className="text-center text-muted-foreground">
									<div className="mt-4 flex text-sm leading-6 ">
										<label
											htmlFor="video-cover"
											className="relative cursor-pointer rounded-md font-semibold text-indigo-600 outline-none  hover:text-indigo-400"
										>
											<input
												type="file"
												{...register('cover', {
													required: true,
													validate: (v) => {
														const file = v[0];
														if (
															!file.name.endsWith('.jpg') &&
															!file.name.endsWith('.png')
														) {
															return 'Only supports jpg or png';
														}
														if (file.size > 2 * MB) {
															return 'Cover size limit 2mb';
														}
														return true;
													},
												})}
											/>
										</label>
									</div>
									<p className="text-xs leading-50">PNG or JPG up to 2MB</p>
								</div>
							</div>
						</div>
						{/* video */}
						<div className="col-span-full">
							<div className="flex gap-5 items-center">
								<label
									htmlFor="title"
									className="block text-lg font-medium leading-6 text-foreground"
								>
									Video
								</label>
								{errors.video && (
									<span className=" text-red-500 text-sm">
										{errors.video.message}
									</span>
								)}
							</div>
							<div className="mt-2 flex items-center gap-x-3">
								<input
									type="file"
									className="block w-auto text-sm text-muted-foreground
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-md file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-foreground file:text-indigo-600
                                  hover:file:bg-foreground/70 hover:file:cursor-pointer
                                  "
									{...register('video', {
										required: true,
										validate: (v) => {
											const file = v[0];
											if (!file.name.endsWith('.mp4'))
												return 'Only supports mp4';
											if (file.size > 15 * MB) return 'Video size limit 15mb';
											return true;
										},
									})}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-6 flex items-center justify-end gap-x-6">
					<Link href="/">
						<button
							type="button"
							className="text-sm font-semibold leading-6 text-foreground hover:text-foreground/50"
						>
							Cancel
						</button>
					</Link>
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Ok
					</button>
				</div>
			</form>
		</div>
	);
}
