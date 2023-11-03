'use client'

import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import { usePopper } from 'react-popper'
import { IconCategory } from '@tabler/icons-react'
import { useState, Fragment, useEffect } from 'react'
import { get } from '@/actions/request'
import { Tag } from '@prisma/client'

export default function MobileTag() {
    const [tags, setTags] = useState<Tag[]>([])
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [50, 10]
                }
            }
        ]
    })

    useEffect(() => {
        const getData = async () => {
            const res = await get<Tag[]>('/api/tag')
            if (res.body) {
                setTags(res.body)
            }
        }
        getData()
    }, [])

    return (
        <Popover>
            <Popover.Button ref={setReferenceElement}>
                <IconCategory />
            </Popover.Button>
            <Transition as={Fragment} enter="transition-opacity duration-100 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity  duration-100 ease-out" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Popover.Panel className="z-10 bg-background/90 border-foreground/50 border-[1px] rounded m-2 backdrop-blur flex flex-col  justify-center text-base p-2 overflow-auto max-h-72 gap-2" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                    {tags &&
                        tags.map((x) => (
                            <Link href={'/tag/' + x.name} key={x.id}>
                                <div className=" px-3 py-1 inline-flex gap-2 rounded-full items-center hover:bg-foreground/10 transition-colors duration-150 ">
                                    <span>{x.name}</span>
                                </div>
                            </Link>
                        ))}
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
