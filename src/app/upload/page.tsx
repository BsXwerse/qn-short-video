'use client'

import { videoDto } from '@/types/video'
import { Combobox } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { post } from '@/actions/request'
import toast from 'react-hot-toast'

//TODO
const tags = [
    'life',
    'sports',
    'pet',
    'music',
    'travel',
    'food',
    'comedy',
    'technology',
    'education',
    'news',
    'gaming',
    'beauty',
    'fitness',
    'vlogs',
    'documentary',
    'fashion',
    'health',
    'DIY',
    'entertainment',
    'cars',
    'science',
    'art',
    'history',
    'business',
    'cooking',
    'gardening',
    'crafts',
    'celebrities',
    'nature',
    'photography',
    'dance',
    'magic',
    'anime',
    'reviews',
    'trailer',
    'reactions',
    'interviews',
    'reality',
    'pranks',
    'how-to',
    'unboxing',
    'product demos',
    'home improvement',
    'music videos',
    'sustainability',
    'parenting',
    'finance',
    'horror',
    'romance',
    'thriller',
    'fantasy',
    'scifi'
]

interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement
    introduction: HTMLTextAreaElement
}

interface MyFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export default function Upload() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [tagValue, setTagValue] = useState(tags[0])
    const [cover, setCover] = useState<File>()
    const [video, setVideo] = useState<File>()
    if (status !== 'authenticated') {
        return (
            <div className="mx-auto w-screen h-screen inset-x-0 flex items-center justify-center text-foreground text-lg">
                <Link href="/api/auth/signin" className=" underline">
                    please login
                </Link>
            </div>
        )
    }

    const filterTags = tagValue === '' ? tags : tags.filter((x) => x.toLowerCase().includes(tagValue.toLowerCase()))

    const handleSubmit = async (e: React.FormEvent<MyFormElement>) => {
        e.preventDefault()

        const dto: videoDto = {
            title: e.currentTarget.elements.title.value,
            introduction: e.currentTarget.elements.introduction.value,
            tag: tagValue,
            cover: 'test cover url',
            video: 'test video url',
            uploaderId: session.user.id
        }

        const promise = new Promise(async (resolve, reject) => {
            const res = await post<null>('/api/video', dto)
            if (res.code === 200) {
                resolve('done')
            } else {
                reject()
            }
        })
        toast.promise(promise, {
            loading: 'uploading...',
            success: 'upload successful',
            error: 'upload failed'
        })
        promise.then(
            (x) => router.push('/'),
            (x) => {}
        )
    }

    return (
        <div className="mx-auto max-w-2xl inset-x-0 flex items-center justify-center text-lg bg-background">
            <form className="w-full py-10 px-8" onSubmit={handleSubmit}>
                <div className="pb-12">
                    <h2 className="text-lg font-semibold leading-7 text-foreground">Upload</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Upload your wonderful story!</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* title */}
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-base font-medium leading-6 text-foreground">
                                Title
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md outline-none">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-muted-foreground placeholder:text-sm focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                                        placeholder="video title"
                                    />
                                </div>
                            </div>
                        </div>
                        {/*introduction  */}
                        <div className="col-span-full">
                            <label htmlFor="introduction" className="block text-base font-medium leading-6 text-foreground">
                                Introduction
                            </label>
                            <div className="mt-2 text-foreground">
                                <textarea
                                    id="introduction"
                                    name="introduction"
                                    rows={3}
                                    className="block w-full rounded-md p-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none text-foreground bg-background"
                                    placeholder="some words."
                                    defaultValue={''}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">A short introduction to the video.</p>
                        </div>
                        {/* tag  */}
                        <div className="col-span-full">
                            <label htmlFor="tag" className="block text-base font-medium leading-6 text-foreground">
                                Tag
                            </label>
                            <div className="mt-2">
                                <Combobox value={tagValue} onChange={setTagValue}>
                                    <Combobox.Input onChange={(e) => setTagValue(e.target.value)} className=" text-foreground bg-background ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 outline-none rounded-md py-1 px-2" />
                                    <Combobox.Options className="border-foreground/30 border-[1px] rounded-md text-foreground space-y-1 px-2 max-h-52 overflow-auto max-w-[200px] absolute bg-background my-4">
                                        {filterTags.map((x, index) => (
                                            <Combobox.Option key={index} value={x} className="hover:cursor-pointer hover:bg-foreground/20 rounded px-3 py-[2px]">
                                                {x}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                </Combobox>
                            </div>
                        </div>
                        {/* cover */}
                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-base font-medium leading-6 text-foreground">
                                Video cover
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-muted-foreground px-6 py-10">
                                <div className="text-center text-muted-foreground">
                                    <div className="mt-4 flex text-sm leading-6 ">
                                        <label htmlFor="video-cover" className="relative cursor-pointer rounded-md font-semibold text-indigo-600 outline-none  hover:text-indigo-400">
                                            <span>Upload file</span>
                                            <input
                                                id="video-cover"
                                                name="video-cover"
                                                type="file"
                                                className="sr-only"
                                                onChange={(e) => {
                                                    if (e.target.files) {
                                                        setCover(e.target.files[0])
                                                    }
                                                }}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-50">PNG or JPG up to 1MB</p>
                                </div>
                            </div>
                        </div>
                        {/* video */}
                        <div className="col-span-full">
                            <label htmlFor="photo" className="block text-base font-medium leading-6 text-foreground">
                                Video
                            </label>
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
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setVideo(e.target.files[0])
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link href="/">
                        <button type="button" className="text-sm font-semibold leading-6 text-foreground hover:text-foreground/50">
                            Cancel
                        </button>
                    </Link>
                    <button type="submit" className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Ok
                    </button>
                </div>
            </form>
        </div>
    )
}
