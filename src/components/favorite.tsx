import { IconHeartFilled } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { get, post } from '@/actions/request'
import clsx from 'clsx'
import { useCallback, useState, useEffect } from 'react'

export default function Favorite({ videoId }: { videoId: number }) {
    const { data: session, status } = useSession()
    const [isFavorited, setFavorite] = useState(false)

    useEffect(() => {
        if (status === 'authenticated' && videoId !== -1) {
            const userId = session.user.id
            const params = new URLSearchParams()
            params.append('userId', userId)
            params.append('videoId', videoId.toString())
            get<boolean>('/api/user/favorite', params)
                .then((x) => {
                    if (x.code !== 200) {
                        console.error(x.msg)
                    } else {
                        if (x.body !== undefined) {
                            setFavorite(x.body)
                        }
                    }
                })
                .catch((x) => console.error(x))
        }
    }, [status, videoId])

    const handleClick = useCallback(() => {
        if (status === 'authenticated') {
            const params = {
                userId: session.user.id,
                videoId
            }
            post<boolean>('/api/user/favorite', params)
                .then((x) => {
                    if (x.code !== 200) {
                        console.error(x.msg)
                    } else {
                        if (x.body !== undefined) {
                            setFavorite(x.body)
                        }
                    }
                })
                .catch((x) => console.error(x))
        }
    }, [status, videoId])

    return (
        videoId !== -1 && (
            <button className="w-16 h-16 bg-white/50 absolute  rounded-full right-72 lg:right-0 bottom-28 flex items-center justify-center z-[110] hover:bg-white/70" onClick={handleClick}>
                <IconHeartFilled
                    className={clsx('w-10 h-10 transition-colors', {
                        ['text-red-500']: isFavorited,
                        ['text-white']: !isFavorited
                    })}
                />
            </button>
        )
    )
}
