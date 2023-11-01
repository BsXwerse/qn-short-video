import { getFavorites } from '@/actions/video'
import VideoCard from '@/components/video-card'
import { auth } from '@/lib/auth'
import { VideoItem } from '@/types/video'
import { IconHome } from '@tabler/icons-react'
import Link from 'next/link'

export default async function Favorite() {
    const session = await auth()
    const videos: VideoItem[] = session ? await getFavorites(session.user.id) : []
    return (
        <>
            <div className="text-foreground mx-auto max-w-3xl space-y-10 p-10">
                {videos.map((x) => (
                    <VideoCard key={x.id} item={x} />
                ))}
            </div>
            <Link href="/" className="fixed right-10 bottom-10 lg:right-20 lg:bottom-20 text-foreground">
                <IconHome className="h-8 w-8" />
            </Link>
        </>
    )
}
