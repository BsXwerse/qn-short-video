import { VideoItem } from "@/types/video";
import { Transition } from "@headlessui/react";
import Image from "next/image";

export default function VideoInfo({item, isShow}: {item: VideoItem, isShow: boolean}) {
    return item && (
        <Transition 
            show={isShow}
            className='absolute h-full w-full z-[100] text-foreground flex flex-col justify-between'
        >
            <Transition.Child 
                className='absolute h-full w-full bg-gradient-to-b from-black/80 to-60%'
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 -translate-y-40"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-40"
            />
            <Transition.Child 
                className='py-16 px-5 z-10'
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-40"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-40"
            >
                <p className="line-clamp-3">{item.introduction}</p>
            </Transition.Child>

            <Transition.Child
                className='flex items-end w-full justify-between lg:flex-row-reverse pb-16 px-5 z-10'
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-40"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-40"
            >
                <h2 className="font-semibold text-lg truncate max-lg:max-w-[250px] drop-shadow ">{item.title}</h2>
                <div className="flex flex-col items-center gap-3 lg:flex-row-reverse">
                    <button className=" bg-indigo-600 rounded-full font-semibold p-1 text-[12px] shrink-0">+ follow</button>
                    <Image src={item.uploder.image as string} width={40} height={40} alt="uploader img" className=" rounded-full"/>
                </div>
            </Transition.Child>
        </Transition>
    )
}