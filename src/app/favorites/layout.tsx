import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Favorites',
    description: 'All your favorite videos are here'
}

export default function Layout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
    return (
        <>
            {children}
            {modal}
        </>
    )
}
