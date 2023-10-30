'use client'

import { useState, useEffect, useRef, Fragment, useCallback } from 'react'
import { Transition } from '@headlessui/react'
import Video from '@/components/video'
import { imgArray, videoArray } from '@/test/test'
import { throttle } from '@/utils/fn'
import Favorite from '@/components/favorite'
import clsx from 'clsx'
import { VideoItem } from '@/types/video'
import { get } from '@/actions/request'

const PAGE_SIZE = 5

export default function Player({ tag }: { tag?: string }) {
    const [togle, setTogle] = useState(true)
    const togleRef = useRef(togle)
    const mainRef = useRef<HTMLDivElement>(null)
    const [direction, setDirection] = useState(true)
    const [videoItems, setVideoItems] = useState<VideoItem[]>([])
    const videoRef = useRef<VideoItem[]>(videoItems)
    const [isPlay, setIsPaly] = useState(false)
    const isPlayRef = useRef(isPlay)
    const cur = useRef(0)
    const A = useRef(0)
    const B = useRef(0)

    const changeUp = useCallback(async () => {
        if (cur.current % PAGE_SIZE === 0) {
            if (cur.current === 0) {
                return
            }
            const params = new URLSearchParams()
            params.append('pageNum', ''+ Math.floor((cur.current-1)/PAGE_SIZE))
            params.append('pageSize', ''+PAGE_SIZE)
            if (tag) params.append('tag', tag)
            const data = await get<VideoItem[]>('/api/video', params)
            if (data.body) {
                if (data.body.length === 0) {
                    return
                }
                setVideoItems(data.body)
                videoRef.current = data.body
            }
        }
        cur.current--
        setDirection(false)
        togleRef.current = !togleRef.current
        setTogle(togleRef.current)
        if (togleRef.current) {
            A.current = cur.current%PAGE_SIZE
        } else {
            B.current = cur.current%PAGE_SIZE
        }
    }, [])

    const changeDown = useCallback(async () => {
        if ((cur.current % PAGE_SIZE) + 1 === videoRef.current.length) {
            if (videoRef.current.length < PAGE_SIZE) {
                return
            }
            const params = new URLSearchParams()
            params.append('pageNum', '' + (cur.current + 1) / PAGE_SIZE)
            params.append('pageSize', '' + PAGE_SIZE)
            if (tag) params.append('tag', tag)
            const data = await get<VideoItem[]>('/api/video', params)
            if (data.body) {
                if (data.body.length === 0) {
                    return
                }
                setVideoItems(data.body)
                videoRef.current = data.body
            }
        }
        cur.current++
        setDirection(true)
        togleRef.current = !togleRef.current
        setTogle(togleRef.current)
        if (togleRef.current) {
            A.current = cur.current % PAGE_SIZE
        } else {
            B.current = cur.current % PAGE_SIZE
        }
    }, [])

    const handleWheel = useCallback((e: WheelEvent) => {
        if (e.deltaY > 0) {
            changeDown()
        } else {
            changeUp()
        }
    }, [])

    const handleClick = useCallback((e: PointerEvent) => {
        if (e.clientY <= window.innerHeight / 5) {
            changeUp()
        } else if (e.clientY >= (window.innerHeight * 4) / 5) {
            changeDown()
        } else {
            isPlayRef.current = !isPlayRef.current
            setIsPaly(isPlayRef.current)
        }
    }, [])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            changeUp()
        } else if (e.key === 'ArrowDown') {
            changeDown()
        }
    }, [])

    useEffect(
        useCallback(() => {
            const warpW = throttle(handleWheel, 600)
            const warpC = throttle(handleClick, 600)
            const warpK = throttle(handleKeyDown, 600)
            mainRef.current?.addEventListener('pointerup', warpC)
            mainRef.current?.addEventListener('wheel', warpW)
            document.addEventListener('keydown', warpK)
            const params = new URLSearchParams()
            params.append('pageNum', '0')
            params.append('pageSize', '' + PAGE_SIZE)
            if (tag) params.append('tag', tag)
            const f = async () => {
                const data = await get<VideoItem[]>('/api/video', params)
                if (data.body) {
                    setVideoItems(data.body)
                    videoRef.current = data.body
                }
            }
            f()
            return () => {
                mainRef.current?.removeEventListener('pointerup', warpC)
                mainRef.current?.removeEventListener('wheel', warpW)
                document.removeEventListener('keydown', warpK)
            }
        }, []),
        []
    )

    return (
        <div className="h-screen relative overflow-hidden" ref={mainRef}>
            <Favorite videoId={videoItems.length === 0 ? -1 : videoItems[cur.current%PAGE_SIZE].id}/>
            <Transition
                as={Fragment}
                show={togle}
                enter="transition-all duration-500"
                enterFrom={clsx(
                    'scale-50 opacity-0',
                    {
                        ['translate-y-[1000px]']: direction
                    },
                    {
                        ['-translate-y-[1000px]']: !direction
                    }
                )}
                enterTo="translate-y-0 scale-100 opacity-100"
                leave="transition-all duration-500 "
                leaveFrom="translate-y-0 scale-100 opacity-100"
                leaveTo={clsx(
                    'scale-50 opacity-0',
                    {
                        ['-translate-y-[1000px]']: direction
                    },
                    {
                        ['translate-y-[1000px]']: !direction
                    }
                )}
            >
                <Video coverUrl={imgArray[A.current]} url={videoArray[A.current % videoArray.length]} item={videoItems[A.current]} isPlay={isPlay}/>
            </Transition>
            <Transition
                as={Fragment}
                show={!togle}
                enter="transition-all duration-500"
                enterFrom={clsx(
                    'scale-50 opacity-0',
                    {
                        ['translate-y-[1000px]']: direction
                    },
                    {
                        ['-translate-y-[1000px]']: !direction
                    }
                )}
                enterTo="translate-y-0 scale-100 opacity-100"
                leave="transition-all duration-500"
                leaveFrom="translate-y-0 scale-100 opacity-100"
                leaveTo={clsx(
                    'scale-50 opacity-0',
                    {
                        ['-translate-y-[1000px]']: direction
                    },
                    {
                        ['translate-y-[1000px]']: !direction
                    }
                )}
            >
                <Video coverUrl={imgArray[B.current]} url={videoArray[B.current % videoArray.length]} item={videoItems[B.current]} isPlay={isPlay}/>
            </Transition>
        </div>
    )
}
