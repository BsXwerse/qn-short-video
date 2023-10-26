'use client'

import { useState } from "react"
import {usePopper} from 'react-popper'
import { Popover} from "@headlessui/react"

export default function LoginBar({showName}: {showName: boolean}) {
  let [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  let { styles, attributes } = usePopper(referenceElement, popperElement)
    return (
        <Popover>
            <div className="flex px-10 py-10 items-center gap-4">
                <Popover.Button ref={setReferenceElement} >
                    <img src="https://cdn.pixabay.com/photo/2016/02/10/16/37/cat-1192026_640.jpg" alt="avatar" className="w-10 h-10 rounded-full"/>
                </Popover.Button>
                {showName && <span>Bob23</span>} 
            </div>
            <Popover.Panel className='z-10 w-52 h-52 bg-slate-300'
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}           
            >
            </Popover.Panel>
        </Popover>
    )
}