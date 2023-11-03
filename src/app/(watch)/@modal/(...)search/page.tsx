'use client'

import { get } from '@/actions/request'
import Modal from '@/components/modal'
import VideoCard from '@/components/video-card'
import { VideoItem } from '@/types/video'
import { Transition } from '@headlessui/react'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'

export default function Search() {
    const [search, setSearch] = useState('')
    const [videos, setVideos] = useState<VideoItem[]>([])
    const [open, setOpen] = useState(false)
    const handleSearch = () => {
        const getData = async () => {
            const params = new URLSearchParams()
            params.append('keywords', search)
            const res = await get<VideoItem[]>('/api/video/search', params)
            if (res.code !== 200) {
                console.error(res.msg)
            } else {
                if (res.body) {
                    setVideos(res.body)
                }
            }
        }
        getData()
    }
    return (
        <Modal>
            <div className="max-w-sm w-full h-auto border-[1px] border-muted-foreground bg-background rounded-lg flex items-center justify-center gap-3 p-4 text-foreground mx-5">
                <input
                    type="text"
                    className="border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-muted-foreground placeholder:text-sm sm:text-sm sm:leading-6 outline-none w-full"
                    value={search}
                    onChange={(e: any) => {
                        setSearch(e.target.value)
                        setOpen(true)
                    }}
                />
                <button onClick={handleSearch}>
                    <IconSearch />
                </button>
            </div>
            <Transition
                show={open}
                className="max-w-2xl my-10 flex flex-col gap-4 max-h-[70vh] lg:max-h-[70vh] overflow-auto mx-5"
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                {videos.map((x) => (
                    <VideoCard item={x} key={x.id} jumpUrl="/search/play/" />
                ))}
            </Transition>
        </Modal>
    )
}
