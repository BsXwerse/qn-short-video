import Link from "next/link"
import {IconHeart, IconSettings, IconUpload, IconSearch, IconTestPipe2, IconUserPlus} from '@tabler/icons-react'
import LoginBar from "./loginbar"

export default function RightBar() {
    return (
        <div className="hidden h-screen right-0 w-60 shrink-0 mr-5 lg:flex flex-col justify-between text-xl border-l-[1px] text-foreground border-foreground/30">
            <div className="flex flex-col gap-4 py-10 px-8">
                <Link href='/' >
                    <div className=" flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-api-app hover:bg-foreground/10 rounded-full transition-colors duration-150" width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 15h-6.5a2.5 2.5 0 1 1 0 -5h.5"></path>
                        <path d="M15 12v6.5a2.5 2.5 0 1 1 -5 0v-.5"></path>
                        <path d="M12 9h6.5a2.5 2.5 0 1 1 0 5h-.5"></path>
                        <path d="M9 12v-6.5a2.5 2.5 0 0 1 5 0v.5"></path>
                        </svg>
                    </div>
                </Link>
                <hr className=" border-foreground/30"/>
                <Link href='test'>
                    <div className=" px-5 inline-flex gap-2 h-14 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150 ">
                        <IconTestPipe2/>
                        test
                    </div>
                </Link>
                <Link href='search'>
                    <div className=" px-5 inline-flex gap-2  h-14 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
                        <IconSearch/>
                        <span>search</span>
                    </div>
                </Link>
                <Link href='follow'>
                    <div className=" px-5 inline-flex gap-2  h-14 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
                        <IconUserPlus/>
                        <span>follow</span>
                    </div>
                </Link>
                <Link href='favorites'>
                    <div className=" px-5 inline-flex gap-2  h-14 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
                        <IconHeart/>
                        <span>favorites</span>
                    </div>
                </Link>
                <Link href='setting'>
                    <div className=" px-5 inline-flex gap-2  h-14 rounded-full items-center  hover:bg-foreground/10 transition-colors duration-150">
                        <IconSettings/>
                        <span>setting</span>
                    </div>
                </Link>
                <Link href='upload'>
                    <div className="px-5 inline-flex gap-2  h-14 rounded-full items-center bg-sky-600 hover:bg-sky-700 transition-colors duration-150">
                        <IconUpload/>
                        <span>upload</span>
                    </div>
                </Link>
            </div>
            <LoginBar showName={true}/>
        </div>
    )
}