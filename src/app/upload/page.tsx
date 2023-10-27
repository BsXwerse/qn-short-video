'use client'

import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Upload() {
    const {data: session, status} = useSession()
    console.log(session)
    if (status !== 'authenticated') {
        return (
            <div className="mx-auto w-screen h-screen inset-x-0 flex items-center justify-center text-foreground text-lg">
                <Link href='/api/auth/signin' className=" underline">please login</Link>
            </div>
        )
    }
    return (
        <h1>0000</h1>
    )
}