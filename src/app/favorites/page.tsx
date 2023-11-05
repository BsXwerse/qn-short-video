import { getFavorites } from '@/actions/video'
import VideoCard from '@/components/video-card'
import { auth } from '@/lib/auth'
import { VideoItem } from '@/types/video'
import { IconHome } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import DefaultImg from '../../../public/imgs/default.png'

export default async function Favorite() {
    const session = await auth()
    if (!session) {
        return (
            <div className=" h-screen w-screen flex items-center justify-center">
                <Link href="/api/auth/signin" className=" text-foreground text-2xl underline hover:text-foreground/50">
                    please login
                </Link>
            </div>
        )
    }
    const videos: VideoItem[] = session ? await getFavorites(session.user.id) : []
    return (
        <>
            <div className="text-foreground mx-auto max-w-3xl space-y-10 p-10">{videos.length === 0 ? <Image src={DefaultImg} alt="no video" width={1000} height={1000} className="w-full h-full" /> : videos.map((x) => <VideoCard key={x.id} item={x} jumpUrl="/favorites/play/" />)}</div>
            <Link href="/" className="fixed right-10 bottom-10 lg:right-20 lg:bottom-20 text-foreground">
                <IconHome className="h-8 w-8" />
            </Link>
        </>
    )
}
