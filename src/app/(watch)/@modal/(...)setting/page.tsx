'use client'

import Modal from '@/components/modal'

export default function Setting() {
    const togleDark = () => {
        const html = document.querySelector('html')
        html?.classList.toggle('dark')
    }

    return (
        <Modal>
            <div className=" bg-background border-muted-foreground border-[1px] rounded-lg max-w-xs max-h-[90vh] w-auto h-auto p-4 text-foreground space-y-2 font-semibold text-xl overflow-auto text-center">
                <p className="hover:bg-muted p-2 rounded-md hover:cursor-pointer" onClick={togleDark}>
                    dark mode
                </p>
                <p className="hover:bg-muted p-2 rounded-md hover:cursor-pointer">auto play</p>
            </div>
        </Modal>
    )
}
