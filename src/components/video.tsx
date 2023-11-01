import { VideoItem } from '@/types/video'
import { Transition } from '@headlessui/react'
import { forwardRef, useState, Fragment, useRef, useEffect, MouseEvent } from 'react'
import VideoInfo from './video-info'
import DefaultCover from '../../public/imgs/default.png'
import Image from 'next/image'
import clsx from 'clsx'

const Video = forwardRef<HTMLDivElement, { url: string; item: VideoItem; isPlay: boolean }>(({ url, item, isPlay }, ref) => {
    //TODO使用item url
    const [open, setOpen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false)
            }
        }
        document.addEventListener('keydown', handleEsc)
        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [])

    useEffect(() => {
        if (isPlay) {
            videoRef.current?.play()
        }
    }, [isPlay])

    return (
        <div ref={ref} className="absolute inset-0">
            <VideoInfo item={item} isShow={!isPlay} />
            <div className="flex justify-center items-center absolute inset-0 m-auto">
                <Image src={item ? (item.coverUrl as string) : DefaultCover} alt="video cover" className="h-full object-contain" width={1000} height={1000} />
                <button
                    className={clsx('absolute rounded-full shadow z-[110]', {
                        ['hidden']: open,
                        ['inline']: !open
                    })}
                    onClick={() => setOpen(true)}
                >
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 hover:opacity-75 transition duration-150 ease-in-out" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient x1="78.169%" y1="9.507%" x2="24.434%" y2="90.469%" id="a">
                                <stop stopColor="#EBF1F5" stopOpacity=".8" offset="0%" />
                                <stop stopColor="#EBF1F5" offset="100%" />
                            </linearGradient>
                        </defs>
                        <circle fill="url(#a)" cx="44" cy="44" r="44" />
                        <path className="fill-current text-violet-400" d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z" />
                    </svg>
                </button>
            </div>
            <Transition show={open} className="fixed inset-0 bg-background transition-opacity z-[80]" enter="transition ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="transition ease-out duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" />
            <Transition show={open} as={Fragment} enter="transition-opacity duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterEnter={() => videoRef.current?.play()}>
                <video ref={videoRef} className="absolute inset-0 m-auto h-full z-[90] rounded" loop controls>
                    <source src={url} />
                    Your browser does not support the video tag.
                </video>
            </Transition>
        </div>
    )
})

Video.displayName = 'video-comp'

export default Video
