import type { Metadata } from 'next'
import Header from '@/components/header'
import RightBar from '@/components/rightbar'
import LeftBar from '@/components/leftbar'

export const metadata: Metadata = {
    title: 'Watch',
    description: 'Video playback home page, you can use the mouse wheel or up and down keys to switch videos'
}

export default function Layout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
    return (
        <>
            <div className="flex">
                <LeftBar />
                <main className="mx-auto max-w-4xl w-full">
                    <Header />
                    {children}
                </main>
                <RightBar />
            </div>
            {modal}
        </>
    )
}
