import { VideoItem } from '@/types/video'
import Image from 'next/image'
import Link from 'next/link'

export default function VideoCard({ item }: { item: VideoItem }) {
    return (
        <div className="text-foreground rounded-lg border-[1px] border-muted w-full hover:bg-muted transition-colors duration-300 lg:flex lg:h-60 shadow">
            <Image src={item.coverUrl as string} width={300} height={300} alt="video cover" className="object-cover lg:rounded-l-lg max-lg:rounded-t-lg w-full h-52 lg:w-auto lg:h-auto " />
            <div className="m-3 ml-5 flex flex-col justify-between gap-3">
                <div className="space-y-2">
                    <Link href={'/favorites/play/' + item.id} scroll={false}>
                        <h1 className="text-2xl font-bold hover:text-indigo-600 transition-colors duration-300">{item.title}</h1>
                    </Link>
                    <p className="line-clamp-4 text-muted-foreground">{item.introduction}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Image src={item.uploder.image as string} width={30} height={30} alt="uploader image" className=" rounded-full" />•<span>{item.uploder.name}</span>•<span className="text-[10px]">{item.uploadTime.toDateString()}</span>
                </div>
            </div>
        </div>
    )
}
