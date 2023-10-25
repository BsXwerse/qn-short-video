'use client'

import { useState, useEffect, useRef, Fragment } from 'react'
import { Transition } from '@headlessui/react'
import Video from '@/components/video'
import clsx from 'clsx'

export default function Home() {
  const imgNames = [
    '1.jpg',  '10.png', '11.png',
    '12.jpg', '13.jpg', '14.jpg',
    '15.png', '16.png', '17.png',
    '18.jpg', '2.jpg',  '3.jpg',
    '4.jpg',  '5.jpg',  '6.jpg',
    '7.png',  '8.jpg',  '9.jpg'
  ]

  const imgs = imgNames.map(x => (
    <img src={'imgs/' + x} alt="test img" className="absolute w-screen h-screen object-cover"/>
  ))

  const [togle, setTogle] = useState(true)
  const [direction, setDirection] = useState(true)
  const cur = useRef(0)
  const A = useRef(0)
  const B = useRef(0)

  useEffect(() => {
    const change = () => {
      setTogle(!togle)
      if (!togle) {
        A.current = cur.current
      } else {
        B.current = cur.current
      }

    }
    const handle = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setDirection(true)
        cur.current = (cur.current+1) % imgs.length
      } else {
        setDirection(false)
        cur.current = (cur.current-1) == -1 ? imgs.length-1 : cur.current-1
      }
      change()
    }
    const handleClick = (e: PointerEvent) => {
      if (e.clientY <= window.innerHeight/3) {
        setDirection(false)
        cur.current = (cur.current-1) == -1 ? imgs.length-1 : cur.current-1
        change()
      } else if (e.clientY >= window.innerHeight*2/3) {
        setDirection(true)
        cur.current = (cur.current+1) % imgs.length
        change()
      }
    }
    document.addEventListener('wheel', handle)
    document.addEventListener('pointerup', handleClick)
    return () => {
      document.removeEventListener('wheel', handle)
      document.removeEventListener('pointerup', handleClick)
    }
  }, [togle])

  return (
    <div className="h-screen relative">
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
        <Video coverUrl='imgs/14.jpg' url='video/1.mp4'/>
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
        <Video coverUrl='imgs/14.jpg' url='video/1.mp4'/>
      </Transition>
    </div>
  )
}
