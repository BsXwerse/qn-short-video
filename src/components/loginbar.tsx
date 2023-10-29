'use client'

import { Fragment, useState } from 'react'
import { usePopper } from 'react-popper'
import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import { IconLogout, IconLoader2, IconLogin, IconUser } from '@tabler/icons-react'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function LoginBar({ showName }: { showName: boolean }) {
    const { data: session, status } = useSession()
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 10]
                }
            }
        ]
    })

    const loginStatus = () => {
        switch (status) {
            case 'loading':
                return <IconLoader2 className="animate-spin w-8 h-8" />
            case 'authenticated':
                return (
                    <Popover.Button ref={setReferenceElement}>
                        <Image src={session.user?.image as string} alt="avatar" width={40} height={40} className="rounded-full shrink-0" />
                    </Popover.Button>
                )
            default:
                return (
                    <Popover.Button ref={setReferenceElement}>
                        <IconUser className="w-8 h-8" />
                    </Popover.Button>
                )
        }
    }

    return (
        <Popover>
            <div className="flex px-12 py-10 items-center gap-4 shrink-0 text-foreground">
                {loginStatus()}
                {showName && session && <span>{session.user?.name}</span>}
            </div>
            <Transition as={Fragment} enter="transition-opacity duration-100 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity  duration-100 ease-out" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Popover.Panel className="z-10 bg-background/90 border-foreground/50 border-[1px] rounded m-2 backdrop-blur flex flex-col items-center justify-center text-base p-2" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                    {status === 'authenticated' ? (
                        <div className=" px-2 inline-flex gap-2 h-8 rounded-full items-center hover:bg-foreground/10 transition-colors duration-150 hover:cursor-pointer" onClick={() => signOut()}>
                            <IconLogout />
                            <span>logout</span>
                        </div>
                    ) : (
                        <div className=" px-2 inline-flex gap-2 h-8 rounded-full items-center hover:bg-foreground/10 transition-colors duration-150 hover:cursor-pointer" onClick={() => signIn()}>
                            <IconLogin />
                            <span>login</span>
                        </div>
                    )}
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
