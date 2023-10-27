'use client'

import { Fragment, useState } from "react"
import {usePopper} from 'react-popper'
import { Popover, Transition} from "@headlessui/react"
import Link from "next/link"
import {IconLogout} from '@tabler/icons-react'

export default function LoginBar({showName}: {showName: boolean}) {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
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

    return (
        <Popover>
            <div className="flex px-10 py-10 items-center gap-4 shrink-0">
                <Popover.Button ref={setReferenceElement} >
                    <img src="https://cdn.pixabay.com/photo/2016/02/10/16/37/cat-1192026_640.jpg" alt="avatar" className="w-10 h-10 rounded-full shrink-0"/>
                </Popover.Button>
                {showName && <span>Bob23</span>} 
            </div>
            <Transition
                as={Fragment}
                enter="transition-opacity duration-200 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity  duration-100 ease-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Popover.Panel className='z-10 bg-background/90 border-foreground/50 border-[1px] rounded m-2 backdrop-blur flex flex-col items-center justify-center text-base p-2'
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}           
                >
                    <Link href='api/auth/logout'>
                        <div className=" px-2 inline-flex gap-2 h-8 rounded-full items-center hover:bg-foreground/10 transition-colors duration-150">
                            <IconLogout/>
                            <span>logout</span>
                        </div>
                    </Link>                   
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}