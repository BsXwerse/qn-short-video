import { IconHeartFilled } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'

export default function Favorite({videoId}: {videoId: number}) {
    const {data: session, status} = useSession()
    //TODO

    return (
        <div className="w-16 h-16 bg-foreground/50 absolute  rounded-full right-72 lg:right-0 bottom-28 flex items-center justify-center z-20">
            <IconHeartFilled className=" w-10 h-10 text-red-500 lg:text-white" />
        </div>
    )
}
