'use client'

import { useState, useEffect, useRef, Fragment, useCallback } from 'react'
import { Transition } from '@headlessui/react'
import Video from '@/components/video'
import { imgArray, videoArray } from '@/test/test'
import { throttle } from '@/utils/fn'
import clsx from 'clsx'

export default function Home() {
  const [togle, setTogle] = useState(true)
  const togleRef = useRef(togle)
  const mainRef = useRef<HTMLDivElement>(null)
  const [direction, setDirection] = useState(true)
  const cur = useRef(0)
  const A = useRef(0)
  const B = useRef(0)

  const changeUp = useCallback(() => {
    setDirection(false)
    cur.current = (cur.current-1) == -1 ? imgArray.length-1 : cur.current-1
    togleRef.current = !togleRef.current
    setTogle(togleRef.current)
    if (togleRef.current) {
      A.current = cur.current
    } else {
      B.current = cur.current
    }
  }, [])

  const changeDown = useCallback(() => {
    setDirection(true)
    cur.current = (cur.current+1) % imgArray.length
    togleRef.current = !togleRef.current
    setTogle(togleRef.current)
    if (togleRef.current) {
      A.current = cur.current
    } else {
      B.current = cur.current
    }
  }, [])

  const handleWheel = useCallback( (e: WheelEvent) => {
    if (e.deltaY > 0) {
      changeDown()
    } else {
      changeUp()
    }
  }, [])

  const handleClick = useCallback((e: PointerEvent) => {
    if (e.clientY <= window.innerHeight/5) {
      changeUp()
    } else if (e.clientY >= window.innerHeight*4/5) {
      changeDown()
    }
  }, [])
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' ) {
      changeUp()
    } else if (e.key === 'ArrowDown') {
      changeDown()
    }
  }, [])

  useEffect(useCallback(() => {
    const warpW = throttle(handleWheel, 600)
    const warpC = throttle(handleClick, 600)
    const warpK = throttle(handleKeyDown, 600)
    mainRef.current?.addEventListener('pointerup', warpC)
    mainRef.current?.addEventListener('wheel', warpW)
    document.addEventListener('keydown', warpK)
    return () => {
      mainRef.current?.removeEventListener('pointerup', warpC)
      mainRef.current?.removeEventListener('wheel', warpW)
      document.removeEventListener('keydown', warpK)
    }
  }, []), [])

  return (
    <div className="h-screen relative overflow-hidden" ref={mainRef}>
      <Transition
        as={Fragment}
        show={togle}
        enter="transition-all duration-500"
        enterFrom={clsx("scale-50 opacity-0",
          {
            ['translate-y-[1000px]']: direction 
          },
          {
            ['-translate-y-[1000px]']: !direction 
          }
        )}
        enterTo="translate-y-0 scale-100 opacity-100"
        leave="transition-all duration-500 "
        leaveFrom="translate-y-0 scale-100 opacity-100"
        leaveTo={clsx("scale-50 opacity-0",
          {
            ['-translate-y-[1000px]']: direction 
          },
          {
            ['translate-y-[1000px]']: !direction 
          }
        )}
      >
        <Video coverUrl={imgArray[A.current]} url={videoArray[A.current%videoArray.length]}/>
      </Transition>
      <Transition
        as={Fragment}
        show={!togle}
        enter="transition-all duration-500"
        enterFrom={clsx("scale-50 opacity-0",
          {
            ['translate-y-[1000px]']: direction 
          },
          {
            ['-translate-y-[1000px]']: !direction 
          }
        )}
        enterTo="translate-y-0 scale-100 opacity-100"
        leave="transition-all duration-500"
        leaveFrom="translate-y-0 scale-100 opacity-100"
        leaveTo={clsx("scale-50 opacity-0",
          {
            ['-translate-y-[1000px]']: direction 
          },
          {
            ['translate-y-[1000px]']: !direction 
          }
        )}
      >
        <Video coverUrl={imgArray[B.current]} url={videoArray[B.current%videoArray.length]}/>
      </Transition>
    </div>
  )
}
