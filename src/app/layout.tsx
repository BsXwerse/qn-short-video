import '@/styles/globals.css'

import Providers from '@/components/provider'
import { Toaster } from 'react-hot-toast'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        default: 'Qn-video',
        template: '%s | Qn-video'
    },
    description: 'short video application by nextjs, nextAuth, prisma, etc.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body>
                <Toaster />
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
