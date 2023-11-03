import { VideoItem } from '@/types/video'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

export default function VideoCard({ item, jumpUrl }: { item: VideoItem; jumpUrl: string }) {
    return (
        <div className="text-foreground rounded-lg border-[1px] border-muted w-full hover:bg-muted transition-colors duration-300 lg:flex lg:h-60 shadow bg-background">
            <Image src={item.coverUrl as string} width={600} height={600} alt="video cover" className=" object-cover lg:rounded-l-lg max-lg:rounded-t-lg w-full h-52 lg:h-auto lg:max-w-[300px] shrink-0" />
            <div className="m-3 ml-5 flex flex-col justify-between gap-3">
                <div className="space-y-2">
                    <Link href={jumpUrl + item.id} scroll={false}>
                        <h1 className="text-2xl font-bold hover:text-indigo-600 transition-colors duration-300">{item.title}</h1>
                    </Link>
                    <p className="line-clamp-4 text-muted-foreground">{item.introduction}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Image src={item.uploder.image as string} width={30} height={30} alt="uploader image" className=" rounded-full" />•<span>{item.uploder.name}</span>•<span className="text-[10px]">{dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
            </div>
        </div>
    )
}
