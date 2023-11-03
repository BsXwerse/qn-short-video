'use client'

import Modal from '@/components/modal'
import { IconBrightnessUp, IconMoon, IconCarouselVertical } from '@tabler/icons-react'
import { emitter } from '@/lib/mitt'
import { useRouter } from 'next/navigation'

let isAuto = false
let isDark = true

export default function Setting() {
    const router = useRouter()

    const togleDark = () => {
        const html = document.querySelector('html')
        if (html) {
            isDark = html.classList.toggle('dark')
        }
        router.back()
    }

    const togleAuto = () => {
        isAuto = !isAuto
        emitter.emit('autoplay', isAuto)
        router.back()
    }

    return (
        <Modal>
            <div className=" bg-background border-muted-foreground border-[1px] rounded-lg max-w-xs max-h-[90vh] w-auto h-auto p-4 text-foreground space-y-2 font-semibold text-xl overflow-auto text-center">
                <p className="hover:bg-muted p-2 rounded-md hover:cursor-pointer" onClick={togleDark}>
                    {isDark ? (
                        <span className="flex items-center gap-2">
                            <IconBrightnessUp /> Light Mode
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <IconMoon /> Dark Mode
                        </span>
                    )}
                </p>
                <p className="hover:bg-muted p-2 rounded-md hover:cursor-pointer flex items-center gap-2" onClick={togleAuto}>
                    <IconCarouselVertical /> {isAuto ? 'Auto Play Off' : 'Auto Play On'}
                </p>
            </div>
        </Modal>
    )
}
