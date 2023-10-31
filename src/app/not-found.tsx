import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="h-screen w-screen bg-background flex flex-col justify-center flex-wrap items-center gap-10">
            <h1 className="text-foreground text-5xl">404</h1>
            <Link href="/" className=" text-foreground underline text-lg hover:text-foreground/50">
                back to home
            </Link>
        </div>
    )
}
